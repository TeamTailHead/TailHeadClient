import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
} from "@chakra-ui/react";
import { ServerMessage } from "@tailhead/communicator/dist/message";
import { FC, ReactNode } from "react";

import { useCommunicatorDebugger } from "@/communicator";

import PlayerChatForm from "../sendForms/PlayerChatForm";
import SystemChatForm from "../sendForms/SystemChatForm";

const SendMessagePanel: FC = () => {
  const debug = useCommunicatorDebugger();

  const submitHandler =
    <K extends keyof ServerMessage>(type: K) =>
    async (data: ServerMessage[K]) => {
      debug.triggerReceive(type, data);
    };

  return (
    <>
      <Accordion defaultIndex={[]} allowMultiple>
        <Divider />
        <SendArbitaryItem title="playerChat">
          <PlayerChatForm onSubmit={submitHandler("playerChat")} />
        </SendArbitaryItem>
        <Divider />
        <SendArbitaryItem title="systemChat">
          <SystemChatForm onSubmit={submitHandler("systemChat")} />
        </SendArbitaryItem>
        <Divider />
      </Accordion>
    </>
  );
};

export default SendMessagePanel;

const SendArbitaryItem: FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>{children}</AccordionPanel>
    </AccordionItem>
  );
};
