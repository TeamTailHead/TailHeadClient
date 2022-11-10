import { NodeSocketClient } from "@tailhead/communicator";
import { ipcMain, WebContents } from "electron";
import net from "net";

export function createSocket(webContent: WebContents) {
  const rawSocket = new net.Socket();
  const socket = new NodeSocketClient(rawSocket);

  let isConnected = false;

  rawSocket.on("error", (err) => {
    console.error(err);
  });

  socket.onReceive((data) => {
    webContent.send("socket-on-receive", { data: Buffer.from(data) });
  });

  socket.onDisconnect(() => {
    webContent.send("socket-on-disconnect", {});
  });

  ipcMain.handle("socket-connect", async (_, { host, port }) => {
    if (isConnected) {
      return true;
    }
    console.log("Connect", host, port);
    return await withError(socket.connect(host, port));
    isConnected = true;
  });

  ipcMain.handle("socket-disconnect", async () => {
    return await withError(socket.close());
  });

  ipcMain.handle("socket-send", async (_, { data }) => {
    socket.send(Buffer.from(data));
  });
}

function withError<T>(promise: Promise<T>) {
  return promise.catch((error) => {
    console.log(error);
  });
}
