import { ChakraProvider } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { useCommunicatorDebugger } from "@/communicator";

import { sendedMessageAtom } from "../states";
import DebugView from "./DebugView";

const Debug: FC = () => {
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <ChakraProvider>
      <DebugView />
      <DebugWorker />
    </ChakraProvider>
  );
};

export default Debug;

const DebugWorker = () => {
  const debug = useCommunicatorDebugger();
  const setSendedMessage = useSetRecoilState(sendedMessageAtom);

  useEffect(() => {
    debug.onSend((type, data) => {
      setSendedMessage((prev) => [
        { type, data, timestamp: new Date() },
        ...prev,
      ]);
    });
  }, []);

  return null;
};
