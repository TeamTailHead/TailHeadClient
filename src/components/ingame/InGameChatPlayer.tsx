import styled from "@emotion/styled";
import { FC } from "react";

interface LobbyChatPlayerProps {
  nickname: string;
  content: string;
}

const InGameChatPlayer: FC<LobbyChatPlayerProps> = ({ nickname, content }) => {
  return (
    <LobbyChatPlayerStyle>
      {nickname} : {content}
    </LobbyChatPlayerStyle>
  );
};

export default InGameChatPlayer;

const LobbyChatPlayerStyle = styled.div``;
