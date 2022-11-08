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

const PlayersBox = styled.div`
  background: #eaeaea;
  border-radius: 24px;
`;

const ChatBox = styled.div`
  background: #eaeaea;
  border-radius: 24px;
`;

const StartButton = styled.button`
  display: flex;
  margin: 5% auto;
  width: 300px;
  height: 100px;

  justify-content: center;
  align-items: center;
  font-size: 300%;
  font-weight: bold;
  border-radius: 24px;
`;
