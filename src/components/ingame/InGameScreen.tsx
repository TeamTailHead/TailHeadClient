import styled from "@emotion/styled";
import { FC } from "react";

import { useSendMessage } from "@/communicator";

import Screen from "../common/Screen";
import InGamePlayerList from "./InGamePlayerList";

const GameScreen: FC = () => {
  const send = useSendMessage();

  const handleGameStart = () => {
    send("startGame", {});
  };

  return (
    <Screen>
      Game
      <PlayersBox>
        <InGamePlayerList />
      </PlayersBox>
      <ChatBox></ChatBox>
      <StartButton onClick={handleGameStart}>게임 시작!</StartButton>
    </Screen>
  );
};

export default GameScreen;

const PlayersBox = styled.div``;

const ChatBox = styled.div``;

const StartButton = styled.button``;
