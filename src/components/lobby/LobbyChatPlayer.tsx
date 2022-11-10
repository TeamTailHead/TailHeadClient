import styled from "@emotion/styled";
import { FC } from "react";

interface LobbyChatPlayerProps {
  nickname: string;
  content: string;
}

const LobbyChatPlayer: FC<LobbyChatPlayerProps> = ({ nickname, content }) => {
  return (
    <LobbyChatPlayerStyle>
      {nickname} : {content}
    </LobbyChatPlayerStyle>
  );
};

export default LobbyChatPlayer;

const LobbyChatPlayerStyle = styled.div``;
