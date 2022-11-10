import styled from "@emotion/styled";
import { ChangeEvent, FC, KeyboardEvent, useRef, useState } from "react";
import { useRecoilValue } from "recoil";

import { useSendMessage } from "@/communicator";
import { chatAtom } from "@/states/chat";
import { currentPlayerAtom } from "@/states/currentPlayer";
import { lobbyAdminIdAtom } from "@/states/lobby";

import Screen from "../common/Screen";
import LobbyChatPlayer from "./LobbyChatPlayer";
import LobbyChatSystem from "./LobbyChatSystem";
import PlayerList from "./PlayerList";

const LobbyScreen: FC = () => {
  const lobbyChat = useRecoilValue(chatAtom);
  const adminId = useRecoilValue(lobbyAdminIdAtom);
  const currentPlayer = useRecoilValue(currentPlayerAtom);

  const send = useSendMessage();

  const handleGameStart = () => {
    send("startGame", {});
  };

  const [text, setText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const sendMessage = () => {
    if (text !== "") {
      send("sendChat", { content: text });
      setText("");
    }
    inputRef?.current?.focus();
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const currentPlayerId = currentPlayer.id;
  const isAdmin = currentPlayerId === adminId;

  return (
    <Screen>
      <LobbyScreenBox>
        <PlayersBox>
          접속중인 플레이어
          <PlayerList />
        </PlayersBox>

        <StartButton onClick={handleGameStart} disabled={!isAdmin}>
          게임 시작!
        </StartButton>

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

          <InputBox>
            <ChatInput
              placeholder="메시지를 입력하세요"
              onChange={onChange}
              value={text}
              ref={inputRef}
              onKeyPress={handleKeyPress}
            />
            <ChatInputButton onClick={sendMessage}>전송</ChatInputButton>
          </InputBox>
        </ChatBoxPadding>
      </LobbyScreenBox>
    </Screen>
  );
};

export default LobbyScreen;

const LobbyScreenBox = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: row;
`;

const PlayersBox = styled.div`
  border-radius: 24px;
  width: 20vw;
  height: 60vh;
  margin-top: 5vh;
  margin-left: 5vw;

  text-align: center;

  font-size: 1.5vw;
  font-weight: bold;
  background: #eaeaea;
`;

const StartButton = styled.button`
  display: flex;
  margin: auto;
  border-radius: 24px;
  width: 20vw;
  height: 10vh;
  margin-bottom: 5vh;

  justify-content: center;
  align-items: center;

  font-size: 3vw;
  font-weight: bold;
  background: #eaeaea;
`;

const ChatBoxPadding = styled.div`
  display: flex;
  margin-top: 5vh;
  margin-right: 5vw;

  flex-direction: column;
  align-items: flex-end;
`;

const InputBox = styled.div`
  display: flex;
  width: 25vw;
  margin-top: 3vh;
`;

const ChatBox = styled.div`
  display: flex;
  border-radius: 24px;
  width: 25vw;
  height: 50vh;
  padding: 10px;

  overflow: auto;
  flex-direction: column;

  background: #eaeaea;
`;

const ChatInput = styled.input`
  display: flex;
  border-radius: 24px;
  width: 20vw;
  height: 5vh;

  flex-wrap: nowrap;

  font-size: 1.5vw;
  background: #eaeaea;
`;

const ChatInputButton = styled.button`
  display: flex;
  border-radius: 24px;
  width: 5vw;
  height: 5vh;
  font-size: 1.5vw;
  font-weight: bold;

  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  background: #eaeaea;
`;
