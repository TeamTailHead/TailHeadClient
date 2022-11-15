import styled from "@emotion/styled";
import { ChangeEvent, FC, KeyboardEvent, useRef, useState } from "react";
import { useRecoilValue } from "recoil";

import { useSendMessage } from "@/communicator";
import { chatAtom } from "@/states/chat";
import { deadlineAtom, lastWordAtom, turnTimeStampAtom } from "@/states/game";

import Screen from "../common/Screen";
import InGameChatPlayer from "./InGameChatPlayer";
import InGameChatSystem from "./InGameChatSystem";
import InGamePlayerList from "./InGamePlayerList";
import TimeBar from "./TimeBar";

const InGameScreen: FC = () => {
  const send = useSendMessage();
  const LastWord = useRecoilValue(lastWordAtom);
  // const DeadLine = useRecoilValue(deadlineAtom);
  const InGameChat = useRecoilValue(chatAtom);
  const turnTimestamp = useRecoilValue(turnTimeStampAtom);
  const deadLineTime = useRecoilValue(deadlineAtom);

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

  return (
    <Screen>
      Game
      <TimeBar deadline={deadLineTime} turnTimestamp={turnTimestamp} />
      <PlayersBoxDown>
        <PlayersBox>
          <InGamePlayerList />
        </PlayersBox>
      </PlayersBoxDown>
      <LastWordDesign>{LastWord}</LastWordDesign>
      <GameInformation>제한 시간 안에 단어를 입력해주세요.</GameInformation>
      <ChatBoxPadding>
        <ChatBox>
          {InGameChat.map((chat, idx) => {
            if (chat.type === "system") {
              const { content, level } = chat;
              return (
                <InGameChatSystem level={level} content={content} key={idx} />
              );
            } else {
              const { content, nickname } = chat;
              return (
                <InGameChatPlayer
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
      <FullTimeBar></FullTimeBar>
      <GameTimeLimit></GameTimeLimit>
    </Screen>
  );
};

export default InGameScreen;

const PlayersBox = styled.div`
  display: flex;
  margin-top: 95%;
  flex-direction: row;
  justify-content: space-around;
`;

const PlayersBoxDown = styled.div`
  display: flex;
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
const GameTimeLimit = styled.div``;

const LastWordDesign = styled.div`
  display: flex;
`;

const GameInformation = styled.div`
  display: flex;
`;

const FullTimeBar = styled.div``;
