import { createContext, FC, ReactNode, useContext } from "react";
import { useSetRecoilState } from "recoil";

import { connectionStateAtom } from "@/states/connection";
import { joinStatusAtom } from "@/states/join";

import { Connection } from "../types";
import { notInitializedObject } from "../util";
import { useSendMessage } from "./communicator";

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

  const send = useSendMessage();
  const setJoinStatus = useSetRecoilState(joinStatusAtom);
  const setConnectionStatus = useSetRecoilState(connectionStateAtom);

  return {
    async connect() {
      await connection.connect();
    },
    async disconnect() {
      await connection.disconnect();
    },
    async join(nickname: string) {
      setJoinStatus({
        state: "loading",
      });
      setConnectionStatus({ status: "connecting" });
      await connection.connect();
      setConnectionStatus({ status: "connected" });

      send("join", {
        nickname,
      });
    },
    setOnDisconnect(callback: () => void) {
      connection.onDisconnect(callback);
    },
    setOnError(callback: (error: Error) => void) {
      connection.onError(callback);
    },
  };
};
