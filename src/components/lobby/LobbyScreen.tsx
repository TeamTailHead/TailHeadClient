import styled from "@emotion/styled";
import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
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
      scrollToEnd();
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

  const chatEndRef = useRef<HTMLDivElement>(null);
  const scrollToEnd = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToEnd();
  }, [lobbyChat]);

  return (
    <Screen>
      <LobbyScreenBox>
        <LobbyUpperBox>
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
                    <LobbyChatSystem
                      level={level}
                      content={content}
                      key={idx}
                    />
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
              <div ref={chatEndRef} />
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
        </LobbyUpperBox>
        <StartButton onClick={handleGameStart} disabled={!isAdmin}>
          게임 시작!
        </StartButton>
      </LobbyScreenBox>
    </Screen>
  );
};

export default LobbyScreen;

const BACKGROUND_COLOR = "#d7e6ff";

const LobbyScreenBox = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
`;

const LobbyUpperBox = styled.div`
  display: flex;
  justify-content: space-around;
`;

const PlayersBox = styled.div`
  border-radius: 24px;
  width: 30vw;
  height: 60vh;
  margin-top: 5vh;
  margin-left: 5vw;

  text-align: center;
  border: 2px solid black;
  font-size: 20px;
  font-weight: bold;
  background: ${BACKGROUND_COLOR};
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

  border: 2px solid black;
  font-size: 3vw;
  font-weight: bold;
  background: ${BACKGROUND_COLOR};
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
  width: 100%;
  margin-top: 3vh;
`;

const ChatBox = styled.div`
  display: flex;
  border-radius: 24px;
  width: 35vw;
  height: 50vh;
  padding: 10px;

  overflow: auto;
  flex-direction: column;
  border: 2px solid black;
  background: ${BACKGROUND_COLOR};
`;

const ChatInput = styled.input`
  display: flex;
  border-radius: 24px;
  width: 30vw;
  height: 5vh;

  flex-wrap: nowrap;
  border: 2px solid black;
  background: ${BACKGROUND_COLOR};
`;

const ChatInputButton = styled.button`
  display: flex;
  border-radius: 24px;
  width: 5vw;
  height: 5vh;
  font-weight: bold;

  border: 2px solid black;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  background: ${BACKGROUND_COLOR};
`;
