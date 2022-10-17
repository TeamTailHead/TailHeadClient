import {
  ClientCommunicator,
  StringClientCommunicator,
} from "@tailhead/communicator";
import { ServerMessageHandler } from "@tailhead/communicator/dist/communicator/types";
import { ServerMessage } from "@tailhead/communicator/dist/message";
import { createContext, FC, ReactNode, useContext, useMemo } from "react";

import { notInitializedObject } from "../util";
import { SocketContext } from "./socket";

interface CommunicatorContextValue {
  communicator: ClientCommunicator;
  debug: {
    triggerReceive<K extends keyof ServerMessage>(
      type: K,
      data: ServerMessage[K]
    ): void;
    onSend(handler: (type: string, data: unknown) => void): void;
    onReceive(handler: (type: string, data: unknown) => void): void;
  };
}

export const CommunicatorContext = createContext<CommunicatorContextValue>(
  notInitializedObject("CommunicatorContext")
);

interface CommunicatorProviderProps {
  children: ReactNode;
}

export const CommunicatorProvider: FC<CommunicatorProviderProps> = ({
  children,
}) => {
  const socket = useContext(SocketContext);

  const context = useMemo<CommunicatorContextValue>(() => {
    const communicator = new StringClientCommunicator(socket);

    let onDebugSend: ClientCommunicator["send"] = () => {
      //
    };
    let onDebugReceive = (_type: string, _data: unknown) => {
      //
    };
    const receiverMap = new Map<string, ServerMessageHandler<unknown>>();

    const proxied: ClientCommunicator = {
      send(type, data) {
        onDebugSend(type, data);
        return communicator.send(type, data);
      },
      onReceive(type, fn) {
        const proxiedFn: typeof fn = (data) => {
          onDebugReceive(type, data);
          return fn(data);
        };

        receiverMap.set(type, proxiedFn as ServerMessageHandler<unknown>);
        return communicator.onReceive(type, proxiedFn);
      },
    };

    return {
      communicator: proxied,
      debug: {
        triggerReceive(type, data) {
          const handler = receiverMap.get(type);
          handler?.(data);
        },
        onSend(handler: typeof onDebugSend) {
          onDebugSend = handler;
        },
        onReceive(handler) {
          onDebugReceive = handler;
        },
      },
    };
  }, [socket]);

  return (
    <CommunicatorContext.Provider value={context}>
      {children}
    </CommunicatorContext.Provider>
  );
};

export const useSendMessage = () => {
  const { communicator } = useContext(CommunicatorContext);
  return communicator.send.bind(communicator);
};

export const useSetMessageHandler = () => {
  const { communicator } = useContext(CommunicatorContext);
  return communicator.onReceive.bind(communicator);
};

export const useCommunicatorDebugger = () => {
  const { debug } = useContext(CommunicatorContext);

  return debug;
};
