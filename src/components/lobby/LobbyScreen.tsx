import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilValue } from "recoil";

import { useSendMessage } from "@/communicator";
import { chatAtom } from "@/states/chat";

import Screen from "../common/Screen";
import LobbyChatPlayer from "./LobbyChatPlayer";
import LobbyChatSystem from "./LobbyChatSystem";
import PlayerList from "./PlayerList";

const LobbyScreen: FC = () => {
  const send = useSendMessage();

  const handleGameStart = () => {
    send("startGame", {});
  };
  const lobbyChat = useRecoilValue(chatAtom);

  return (
    <Screen>
      <PlayersBox>
        접속중인 플레이어
        <PlayerList />
      </PlayersBox>
      <ChatBoxPadding>
        <ChatBox>
          {lobbyChat.map((chat, idx) => {
            if (chat.type === "system") {
              const { content, level } = chat;
              return (
                <LobbyChatSystem level={level} content={content} key={idx} />
              );
            } else {
              const { content, nickname } = chat;
              return (
                <LobbyChatPlayer
                  nickname={nickname}
                  content={content}
                  key={idx}
                />
              );
            }
          })}
        </ChatBox>
      </ChatBoxPadding>
      <StartButton onClick={handleGameStart}>게임 시작!</StartButton>
    </Screen>
  );
};

export default LobbyScreen;

const PlayersBox = styled.div`
  background: #eaeaea;
  border-radius: 24px;
  width: 200px;
  text-align: center;
  font-weight: bold;
  position: absolute;
  left: 80px;
  top: 80px;
`;

const ChatBoxPadding = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5%;
  margin-right: 5%;
`;

const ChatBox = styled.div`
  background: #eaeaea;
  width: 400px;
  height: 600px;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const StartButton = styled.button`
  display: flex;
  margin: auto;
  width: 300px;
  height: 100px;

  z-index: 1;
  justify-content: center;
  align-items: center;
  font-size: 300%;
  font-weight: bold;
  border-radius: 24px;
`;
