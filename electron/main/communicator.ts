import {
  NodeSocketClient,
  ServerMessage,
  StringClientCommunicator,
} from "@tailhead/communicator";
import { ipcMain, WebContents } from "electron";
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

export function setupCommunicator(webContent: WebContents) {
  const socket = new net.Socket();
  const nodeSocket = new NodeSocketClient(socket);
  const communicator = new StringClientCommunicator(nodeSocket);

  ipcMain.handle("communicator:send", async (_, { type, data }) => {
    communicator.send(type, data);
  });

  serverMessageTypes.forEach((type) => {
    communicator.onReceive(type, (data) => {
      webContent.send("communicator:receive", { type, data });
    });
  });

  ipcMain.handle("connection:connect", async (_, { host, port }) => {
    return nodeSocket.connect(host, port);
  });

  ipcMain.handle("connection:disconnect", async () => {
    await nodeSocket.close();
  });

  nodeSocket.onDisconnect(() => {
    webContent.send("connection:disconnected");
  });
}
