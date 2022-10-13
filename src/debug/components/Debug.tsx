import { ChakraProvider } from "@chakra-ui/react";
import { FC } from "react";

import Panel from "./Panel";

const Debug: FC = () => {
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <ChakraProvider>
      <Panel />
    </ChakraProvider>
  );
};

export default Debug;
