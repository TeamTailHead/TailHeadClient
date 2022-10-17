import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";

import App from "./App";
import { CommunicatorProvider } from "./communicator/context/communicator";
import { ConnectionProvider } from "./communicator/context/connection";
import SocketProvider from "./communicator/context/socket";
import { createDebugSocket } from "./communicator/socket/debugSocket";
import { createNodeSocket } from "./communicator/socket/nodeSocket";
import { parseConnectionURL } from "./communicator/util";
import { CommunicatorWorker } from "./components/worker";
import { SOCKET_SERVER_URL, USE_DEBUG_SOCKET } from "./const";
import { Debug } from "./debug";

const root = document.getElementById("root");
if (!root) {
  throw new Error("root element not found");
}

const socketFactory = () => {
  if (USE_DEBUG_SOCKET) {
    return createDebugSocket();
  }

  const { host, port } = parseConnectionURL(SOCKET_SERVER_URL);

  return createNodeSocket({
    host: host,
    port: port,
  });
};

const { socket, connection } = socketFactory();

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RecoilRoot>
      <SocketProvider socket={socket}>
        <CommunicatorProvider>
          <ConnectionProvider connection={connection}>
            <App />
            <CommunicatorWorker />
            <Debug />
          </ConnectionProvider>
        </CommunicatorProvider>
      </SocketProvider>
    </RecoilRoot>
  </React.StrictMode>
);
