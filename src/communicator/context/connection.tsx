import { createContext, FC, ReactNode, useContext } from "react";

import { Connection } from "../socket/types";
import { notInitializedObject } from "../util";

export const ConnectionContext = createContext<Connection>(
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
  return (
    <ConnectionContext.Provider value={connection}>
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => {
  const connection = useContext(ConnectionContext);

  return {
    async connect() {
      connection.connect();
    },
  };
};
