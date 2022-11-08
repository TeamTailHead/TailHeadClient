import { ChakraProvider } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { useCommunicatorDebugger } from "@/communicator";

import { receivedMessageAtom, sendedMessageAtom } from "../states";
import DebugView from "./DebugView";

const Debug: FC = () => {
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <ChakraProvider resetCSS={false}>
      <DebugView />
      <DebugWorker />
    </ChakraProvider>
  );
};

export default Debug;

const DebugWorker = () => {
  const debug = useCommunicatorDebugger();
  const setSendedMessage = useSetRecoilState(sendedMessageAtom);
  const setReceivedMessage = useSetRecoilState(receivedMessageAtom);

  useEffect(() => {
    debug.onSend((type, data) => {
      setSendedMessage((prev) => [
        { type, data, timestamp: new Date() },
        ...prev,
      ]);
    });

    debug.onReceive((type, data) => {
      setReceivedMessage((prev) => [
        { type, data, timestamp: new Date() },
        ...prev,
      ]);
    });
  }, []);

  return null;
};
