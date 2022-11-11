import { createContext, FC, ReactNode, useContext } from "react";

import { Connection } from "../types";
import { notInitializedObject } from "../util";

interface ConnectionContext {
  connection: Connection;
}

export const ConnectionContext = createContext<ConnectionContext>(
  notInitializedObject("ConnectionContext")
);

interface ConnectionProviderProps {
  children: ReactNode;
  connection: Connection;
}

export const ConnectionProvider: FC<ConnectionProviderProps> = ({
  children,
  connection,
}) => {
  const ctx: ConnectionContext = {
    connection,
  };

  return (
    <ConnectionContext.Provider value={ctx}>
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => {
  const { connection } = useContext(ConnectionContext);

  return {
    async connect() {
      await connection.connect();
    },
    async disconnect() {
      await connection.disconnect();
    },
    setOnDisconnect(callback: () => void) {
      connection.onDisconnect(callback);
    },
    setOnError(callback: (error: Error) => void) {
      connection.onError(callback);
    },
  };
};
