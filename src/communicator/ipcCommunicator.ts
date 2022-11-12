import { ClientCommunicator } from "@tailhead/communicator";
import { ipcRenderer } from "electron";

import { Connection } from "./types";

const noopFunc = () => {
  //
};

export function createIpcCommunicator(host: string, port: number) {
  const receiveHandlers = new Map();
  let disconnectHandler: () => void = noopFunc;
  let errorHandler: (error: Error) => void = noopFunc;

  const communicator: ClientCommunicator = {
    onReceive(type, fn) {
      receiveHandlers.set(type, fn);
    },
    send(type, data) {
      ipcRenderer.invoke("communicator:send", { type, data });
    },
  };

  const connection: Connection = {
    connect() {
      return ipcRenderer.invoke("connection:connect", { host, port });
    },
    disconnect() {
      return ipcRenderer.invoke("connection:disconnect", {});
    },
    onDisconnect(callback) {
      disconnectHandler = callback;
    },
    onError(callback) {
      errorHandler = callback;
    },
  };

  ipcRenderer.on("communicator:receive", (_, { type, data }) => {
    const handler = receiveHandlers.get(type);
    if (!handler) {
      throw new Error("No handler found of type: " + type);
    }

    handler(data);
  });

  ipcRenderer.on("connection:disconnected", () => {
    disconnectHandler();
  });

  ipcRenderer.on("connection:error", (_, { error }) => {
    errorHandler(error);
  });

  return { communicator, connection };
}
