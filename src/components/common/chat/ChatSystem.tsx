import styled from "@emotion/styled";
import { FC } from "react";

interface LobbyChatSystemProps {
  level: string;
  content: string;
}

const ChatSystem: FC<LobbyChatSystemProps> = ({ level, content }) => {
  return <ChatSystemStyle level={level}>{content}</ChatSystemStyle>;
};

export default ChatSystem;

const ChatSystemStyle = styled.div<{ level: string }>`
  background-color: rgb(244, 244, 244);
  color: ${(props) => getColorByLevel(props.level)};

  border-radius: 8px;
  padding: 5px 8px;
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 10px;
`;

function getColorByLevel(level: string) {
  if (level === "info") return "#464444";
  else if (level === "error") return "#940606";
  else return "#abab21";
}
