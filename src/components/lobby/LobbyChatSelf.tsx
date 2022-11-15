import styled from "@emotion/styled";
import { FC } from "react";

import { glassOverlayStyle } from "@/styles/glass";

interface LobbyChatSelfProps {
  content: string;
}

const LobbyChatSelf: FC<LobbyChatSelfProps> = ({ content }) => {
  return (
    <StyledLobbyChatSelf>
      <Content>{content}</Content>
    </StyledLobbyChatSelf>
  );
};

export default LobbyChatSelf;

const StyledLobbyChatSelf = styled.div`
  margin-bottom: 10px;
  align-self: flex-end;
`;

const Content = styled.div`
  ${glassOverlayStyle}
  background-color: rgba(133, 33, 164, 0.2);

  font-size: 18px;
  padding: 5px 8px;
`;
