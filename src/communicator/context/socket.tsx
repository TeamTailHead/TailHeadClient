import { SocketClient } from "@tailhead/communicator";
import { createContext, FC, ReactNode } from "react";

import { notInitializedObject } from "../util";

export const SocketContext = createContext<SocketClient>(
  notInitializedObject("SocketContext")
);

interface SocketProviderProps {
  children: ReactNode;
  socket: SocketClient;
}

const SocketProvider: FC<SocketProviderProps> = ({ children, socket }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
