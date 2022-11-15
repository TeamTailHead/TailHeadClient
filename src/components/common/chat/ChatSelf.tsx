import styled from "@emotion/styled";
import { FC } from "react";

import { glassOverlayStyle } from "@/styles/glass";

interface LobbyChatSelfProps {
  content: string;
}

const ChatSelf: FC<LobbyChatSelfProps> = ({ content }) => {
  return (
    <StyledChatSelf>
      <Content>{content}</Content>
    </StyledChatSelf>
  );
};

export default ChatSelf;

const StyledChatSelf = styled.div`
  margin-bottom: 10px;
  align-self: flex-end;
`;

const Content = styled.div`
  ${glassOverlayStyle}
  background-color: rgba(133, 33, 164, 0.2);

  font-size: 18px;
  padding: 5px 8px;
`;
