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

      <StartButton onClick={handleGameStart} disabled={!isAdmin}>
        게임 시작!
      </StartButton>
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
  margin-top: 5%;
  margin-right: 5%;
  flex-direction: column;
  align-items: flex-end;
`;

const InputBox = styled.div`
  margin-top: 3%;
  display: flex;
`;

const ChatBox = styled.div`
  background: #eaeaea;
  border-radius: 24px;
  width: 400px;
  height: 600px;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const ChatInput = styled.input`
  background: #eaeaea;
  border-radius: 24px;
  width: 300px;
  height: 50px;

  display: flex;
  flex-wrap: nowrap;
`;

const ChatInputButton = styled.button`
  background: #eaeaea;
  border-radius: 24px;
  width: 100px;
  height: 50px;

  font-size: 130%;
  font-weight: bold;

  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  display: flex;
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
  background: #eaeaea;
`;
