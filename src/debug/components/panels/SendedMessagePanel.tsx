import { Box, Heading, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilValue } from "recoil";

import { sendedMessageAtom } from "../../states";

const SendedMessagePanel: FC = () => {
  const sendedMessage = useRecoilValue(sendedMessageAtom);

  return (
    <Container>
      {sendedMessage.map((message, idx) => (
        <Box key={idx} p={3} shadow="md" borderWidth="1px">
          <Heading fontSize="lg">{message.type}</Heading>
          <pre>{JSON.stringify(message.data, null, 2)}</pre>
          <Text>{message.timestamp.toLocaleString()}</Text>
        </Box>
      ))}
    </Container>
  );
};

export default SendedMessagePanel;

const Container = styled.div``;
