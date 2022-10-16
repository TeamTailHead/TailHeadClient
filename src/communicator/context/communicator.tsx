import {
  ClientCommunicator,
  StringClientCommunicator,
} from "@tailhead/communicator";
import { createContext, FC, ReactNode, useContext, useMemo } from "react";

import { notInitializedObject } from "../util";
import { SocketContext } from "./socket";

export const CommunicatorContext = createContext<ClientCommunicator>(
  notInitializedObject("CommunicatorContext")
);

interface CommunicatorProviderProps {
  children: ReactNode;
}

export const CommunicatorProvider: FC<CommunicatorProviderProps> = ({
  children,
}) => {
  const socket = useContext(SocketContext);

  const communicator = useMemo(() => {
    return new StringClientCommunicator(socket);
  }, [socket]);

  return (
    <CommunicatorContext.Provider value={communicator}>
      {children}
    </CommunicatorContext.Provider>
  );
};

export const useCommunicator = () => {
  const communicator = useContext(CommunicatorContext);

  return {
    send: communicator.send.bind(communicator),
  };
};
