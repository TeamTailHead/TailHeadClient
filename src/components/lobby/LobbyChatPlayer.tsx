import styled from "@emotion/styled";
import { FC } from "react";

import { glassOverlayStyle } from "@/styles/glass";

interface LobbyChatPlayerProps {
  nickname: string;
  content: string;
}

const LobbyChatPlayer: FC<LobbyChatPlayerProps> = ({ nickname, content }) => {
  return (
    <LobbyChatPlayerStyle>
      <Nickname>{nickname}</Nickname>
      <Content>{content}</Content>
    </LobbyChatPlayerStyle>
  );
};

export default LobbyChatPlayer;

const LobbyChatPlayerStyle = styled.div`
  margin-bottom: 10px;
  align-self: flex-start;
`;

const Nickname = styled.div`
  font-size: 16px;
  color: #626262;
  margin-bottom: 3px;
`;

const Content = styled.div`
  ${glassOverlayStyle}

  font-size: 18px;
  padding: 5px 8px;
`;
