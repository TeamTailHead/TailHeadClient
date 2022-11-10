import { SocketClient } from "@tailhead/communicator";
import { ipcRenderer } from "electron";

import { Connection } from "./types";

interface ipcSocketDeps {
  host: string;
  port: number;
}

function noopFunction() {
  //
}

export function createIpcSocket({ host, port }: ipcSocketDeps): {
  socket: SocketClient;
  connection: Connection;
} {
  let receiveHandler: (data: Buffer) => void = noopFunction;
  let disconnectHandler: () => void = noopFunction;

  ipcRenderer.on("socket-on-receive", (_, { data }) => {
    receiveHandler(Buffer.from(data));
  });

  ipcRenderer.on("socket-on-disconnect", () => {
    disconnectHandler();
  });

  const socket: SocketClient = {
    send(data) {
      ipcRenderer.invoke("socket-send", { data });
      return true;
    },
    onReceive(handler) {
      receiveHandler = handler;
    },
    onDisconnect() {
      //
    },
  };

  const connection: Connection = {
    connect() {
      return ipcRenderer.invoke("socket-connect", { host, port });
    },
    disconnect() {
      return ipcRenderer.invoke("socket-disconnect");
    },
    onDisconnect(callback) {
      disconnectHandler = callback;
    },
  };

  return {
    socket,
    connection,
  };
}
