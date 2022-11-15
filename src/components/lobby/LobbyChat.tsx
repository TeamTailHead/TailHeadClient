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
import {
  glassButtonStyle,
  glassCardStyle,
  glassInputStyle,
} from "@/styles/glass";

import LobbyChatPlayer from "./LobbyChatPlayer";
import LobbyChatSystem from "./LobbyChatSystem";

const LobbyChat: FC = () => {
  const lobbyChat = useRecoilValue(chatAtom);

  const send = useSendMessage();

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

  const chatEndRef = useRef<HTMLDivElement>(null);
  const scrollToEnd = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToEnd();
  }, [lobbyChat]);

  return (
    <StyledLobbyChat>
      <ChatArea>
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
        <div ref={chatEndRef} />
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
    </StyledLobbyChat>
  );
};

export default LobbyChat;

const StyledLobbyChat = styled.div`
  ${glassCardStyle}

  display: flex;
  flex-grow: 1;
  margin-left: 10px;
  padding: 10px 10px;

  flex-direction: column;
`;

const InputBox = styled.div`
  display: flex;
  width: 100%;
  margin-top: 8px;
`;

const ChatArea = styled.div`
  flex-grow: 1;
  min-height: 0;
  display: flex;
  padding: 10px;

  overflow: auto;
  flex-direction: column;

  font-size: 20px;
`;

const ChatInput = styled.input`
  ${glassInputStyle}

  display: flex;
  flex-grow: 1;

  flex-wrap: nowrap;
`;

const ChatInputButton = styled.button`
  ${glassButtonStyle}

  margin-left: 5px;
  display: flex;
  font-weight: bold;

  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
`;
