import { ChakraProvider, theme } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { useCommunicatorDebugger } from "@/communicator";

import { receivedMessageAtom, sendedMessageAtom } from "../states";
import DebugView from "./DebugView";

delete theme.styles.global;

const Debug: FC = () => {
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <ChakraProvider resetCSS={false} theme={theme} cssVarsRoot="#chakraRoot">
      <div id="chakraRoot">
        <DebugView />
        <DebugWorker />
      </div>
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
