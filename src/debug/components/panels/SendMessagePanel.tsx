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
import { FC, Fragment, ReactNode } from "react";

import { useCommunicatorDebugger } from "@/communicator";

import JSONForm from "../sendForms/JSONForm";
import { serverMessageValidators } from "../serverMessage";

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
        {serverMessageValidators.map(({ key, validator, defaultValue }) => (
          <Fragment key={key}>
            <SendArbitaryItem title={key}>
              <JSONForm
                formKey={key}
                validator={validator}
                defaultValue={defaultValue}
                onSubmit={submitHandler(key)}
              />
            </SendArbitaryItem>
            <Divider />
          </Fragment>
        ))}
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
