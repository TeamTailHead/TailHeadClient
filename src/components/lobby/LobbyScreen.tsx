import styled from "@emotion/styled";
import { FC } from "react";

import { useSendMessage } from "@/communicator";

import Screen from "../common/Screen";
import PlayerList from "./PlayerList";

const LobbyScreen: FC = () => {
  const send = useSendMessage();

  const handleGameStart = () => {
    send("startGame", {});
  };

  return (
    <Screen>
      LobbyScreen
      <PlayersBox>
        <PlayerList />
      </PlayersBox>
      <ChatBox></ChatBox>
      <StartButton onClick={handleGameStart}>게임 시작!</StartButton>
    </Screen>
  );
};

export default LobbyScreen;

const PlayersBox = styled.div``;

const ChatBox = styled.div``;

const StartButton = styled.button``;
