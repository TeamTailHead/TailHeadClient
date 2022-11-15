import styled from "@emotion/styled";
import { ChangeEvent, FC, KeyboardEvent, useRef, useState } from "react";
import { useRecoilValue } from "recoil";

import { useSendMessage } from "@/communicator";
import { chatAtom } from "@/states/chat";
import { deadlineAtom, lastWordAtom, turnTimeStampAtom } from "@/states/game";
import { glassCardStyle } from "@/styles/glass";

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
    <StyledInGameScreen>
      <LeftSide>
        <GameCard>
          Game
          <TimeBar deadline={deadLineTime} turnTimestamp={turnTimestamp} />
          <LastWordDesign>{LastWord}</LastWordDesign>
          <GameInformation>제한 시간 안에 단어를 입력해주세요.</GameInformation>
        </GameCard>
        <PlayerCard>
          <PlayersBoxDown>
            <PlayersBox>
              <InGamePlayerList />
            </PlayersBox>
          </PlayersBoxDown>
        </PlayerCard>
      </LeftSide>

      <RightSide>
        <ChatCard>
          <ChatArea>
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
          </ChatArea>

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
        </ChatCard>
      </RightSide>
    </StyledInGameScreen>
  );
};

export default InGameScreen;

const StyledInGameScreen = styled(Screen)`
  display: flex;

  padding: 8% 10%;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;

  width: 500px;
`;

const RightSide = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const GameCard = styled.div`
  ${glassCardStyle}

  flex-grow: 1;
`;

const PlayerCard = styled.div`
  ${glassCardStyle}

  margin-top: 10px;
`;

const ChatCard = styled.div`
  ${glassCardStyle}

  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const PlayersBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const PlayersBoxDown = styled.div`
  display: flex;
`;

const InputBox = styled.div`
  display: flex;
`;

const ChatArea = styled.div`
  background: #eaeaea;
  border-radius: 24px;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const ChatInput = styled.input`
  background: #eaeaea;
  border-radius: 24px;
  display: flex;
  flex-wrap: nowrap;
`;

const ChatInputButton = styled.button`
  background: #eaeaea;
  border-radius: 24px;
  font-size: 130%;
  font-weight: bold;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const LastWordDesign = styled.div`
  display: flex;
`;

const GameInformation = styled.div`
  display: flex;
`;
