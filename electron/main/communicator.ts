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

  ipcMain.handle("communicator:send", async (_, { type, data }) => {
    communicator.send(type, data);
  });

  ipcMain.handle("connection:connect", async (_, { host, port }) => {
    return nodeSocket.connect(host, port);
  });

  ipcMain.handle("connection:disconnect", async () => {
    await nodeSocket.close();
  });

  socket.on("error", (error) => {
    console.error(error);
    webContent.send("connection:error", { error });
  });

  nodeSocket.onDisconnect(() => {
    webContent.send("connection:disconnected");
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
