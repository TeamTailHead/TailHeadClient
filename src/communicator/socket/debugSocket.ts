import { SocketClient } from "@tailhead/communicator";

import { Connection } from "./types";

export function createDebugSocket(): {
  socket: SocketClient;
  connection: Connection;
} {
  const socket: SocketClient = {
    send(_data) {
      return true;
    },
    onReceive(_handler) {
      //
    },
    onDisconnect(_handler) {
      //
    },
  };

  const connection: Connection = {
    async connect() {
      //
    },
    async disconnect() {
      //
    },
    onDisconnect(_callback) {
      //
    },
  };

  return {
    socket,
    connection,
  };
}
