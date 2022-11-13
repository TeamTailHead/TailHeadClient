import {
  NodeSocketClient,
  ServerMessage,
  StringClientCommunicator,
} from "@tailhead/communicator";
import { BrowserWindow, ipcMain } from "electron";
import net from "net";

const serverMessageTypes: Array<keyof ServerMessage> = [
  "gameResult",
  "gameTurnInfo",
  "joinError",
  "joinInfo",
  "lobbyInfo",
  "playerChat",
  "systemChat",
];

export function setupCommunicator(win: BrowserWindow) {
  const webContent = win.webContents;

  const socket = new net.Socket();
  const nodeSocket = new NodeSocketClient(socket);
  const communicator = new StringClientCommunicator(nodeSocket);

  const connectionResolvers: Array<{
    resolve: (r: unknown) => void;
    reject: (err: unknown) => void;
  }> = [];

  ipcMain.handle("communicator:send", async (_, { type, data }) => {
    communicator.send(type, data);
  });

  ipcMain.handle("connection:connect", async (_, { host, port }) => {
    return new Promise((resolve, reject) => {
      console.log("Connection Start");
      socket.destroy();
      nodeSocket.connect(host, port);
      connectionResolvers.push({ resolve, reject });
    });
  });

  ipcMain.handle("connection:disconnect", async () => {
    await nodeSocket.close();
  });

  socket.setTimeout(2000);

  socket
    .on("error", (error) => {
      console.error(error);
      webContent.send("connection:error", { error });
      connectionResolvers.splice(0)[0]?.reject(error);
    })
    .on("end", () => {
      console.log("Connection Lost");
      webContent.send("connection:disconnected");
    })
    .on("timeout", () => {
      console.log("Connection Timeout");
      webContent.send("connection:disconnected");
    })
    .on("connect", () => {
      webContent.send("connection:connected");
      connectionResolvers.splice(0)[0]?.resolve({});
    });

  serverMessageTypes.forEach((type) => {
    communicator.onReceive(type, (data) => {
      webContent.send("communicator:receive", { type, data });
    });
  });

  win.on("close", () => {
    socket.destroy();
  });
}
