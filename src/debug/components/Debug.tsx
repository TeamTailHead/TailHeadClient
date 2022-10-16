import { ChakraProvider } from "@chakra-ui/react";
import { FC } from "react";

import DebugPanel from "./DebugPanel";

const Debug: FC = () => {
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <ChakraProvider>
      <DebugPanel />
    </ChakraProvider>
  );
};

export default Debug;
