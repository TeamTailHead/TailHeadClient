import { ClientCommunicator } from "@tailhead/communicator";

import { Connection } from "./types";

export function createMockCommunicator() {
  const communicator: ClientCommunicator = {
    onReceive() {
      //
    },
    send() {
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
    onDisconnect() {
      //
    },
  };

  return { communicator, connection };
}
