import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";

import App from "./App";
import { CommunicatorProvider } from "./communicator/context/communicator";
import { ConnectionProvider } from "./communicator/context/connection";
import { createIpcCommunicator } from "./communicator/ipcCommunicator";
import { createMockCommunicator } from "./communicator/mockCommunicator";
import { parseConnectionURL } from "./communicator/util";
import { CommunicatorWorker } from "./components/worker";
import { SOCKET_SERVER_URL, USE_DEBUG_SOCKET } from "./const";
import { Debug } from "./debug";

const root = document.getElementById("root");
if (!root) {
  throw new Error("root element not found");
}

const communicatorFactory = () => {
  if (USE_DEBUG_SOCKET) {
    return createMockCommunicator();
  }

  const { host, port } = parseConnectionURL(SOCKET_SERVER_URL);

  return createIpcCommunicator(host, port);
};

const { communicator, connection } = communicatorFactory();

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RecoilRoot>
      <CommunicatorProvider communicator={communicator}>
        <ConnectionProvider connection={connection}>
          <App />
          <CommunicatorWorker />
          <Debug />
        </ConnectionProvider>
      </CommunicatorProvider>
    </RecoilRoot>
  </React.StrictMode>
);
