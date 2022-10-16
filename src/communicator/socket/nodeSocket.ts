import { NodeSocketClient, SocketClient } from "@tailhead/communicator";

import { Connection } from "./types";

interface NodeSocketDeps {
  host: string;
  port: number;
}

const noopFunction = () => {
  // do nothing
};

export function createNodeSocket({ host, port }: NodeSocketDeps): {
  socket: SocketClient;
  connection: Connection;
} {
  const socket = new NodeSocketClient();

  let disconnectCallback = noopFunction;

  socket.onDisconnect(disconnectCallback);

  const connection: Connection = {
    connect() {
      return socket.connect(host, port);
    },
    disconnect() {
      return socket.close();
    },
    onDisconnect(callback) {
      disconnectCallback = callback;
    },
  };

  return {
    socket,
    connection,
  };
}
