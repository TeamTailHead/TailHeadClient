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
import {
  glassButtonStyle,
  glassCardStyle,
  glassInputStyle,
} from "@/styles/glass";

import ChatPlayer from "./ChatPlayer";
import ChatSelf from "./ChatSelf";
import ChatSystem from "./ChatSystem";

const ChatList: FC = () => {
  const lobbyChat = useRecoilValue(chatAtom);
  const currentPlayer = useRecoilValue(currentPlayerAtom);

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
    <StyledChatList>
      <ChatArea>
        {lobbyChat.map((chat, idx) => {
          if (chat.type === "system") {
            const { content, level } = chat;
            return <ChatSystem level={level} content={content} key={idx} />;
          }

          if (chat.playerId === currentPlayer.id) {
            const { content } = chat;
            return <ChatSelf content={content} key={idx} />;
          }

          const { content, nickname } = chat;
          return <ChatPlayer nickname={nickname} content={content} key={idx} />;
        })}
        <div ref={chatEndRef} />
      </ChatArea>
      <InputBox>
        <ChatInput
          placeholder="???????????? ???????????????"
          onChange={onChange}
          value={text}
          ref={inputRef}
          onKeyPress={handleKeyPress}
        />
        <ChatInputButton onClick={sendMessage}>??????</ChatInputButton>
      </InputBox>
    </StyledChatList>
  );
};

export default ChatList;

const StyledChatList = styled.div`
  ${glassCardStyle}

  display: flex;
  flex-grow: 1;
  margin-left: 10px;
  padding: 10px 10px;

  flex-direction: column;
`;

const InputBox = styled.div`
  display: flex;
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
  min-width: 60px;

  justify-content: center;
  align-items: center;
`;
