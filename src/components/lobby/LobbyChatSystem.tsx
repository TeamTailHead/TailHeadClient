import styled from "@emotion/styled";
import { FC } from "react";

interface LobbyChatSystemProps {
  level: string;
  content: string;
}

const LobbyChatSystem: FC<LobbyChatSystemProps> = ({ level, content }) => {
  return <LobbyChatSystemStyle level={level}>{content}</LobbyChatSystemStyle>;
};

export default LobbyChatSystem;

const LobbyChatSystemStyle = styled.div<{ level: string }>`
  color: ${(props) => getColorByLevel(props.level)};
  font-weight: 600;
  margin-bottom: 10px;
`;

function getColorByLevel(level: string) {
  if (level === "info") return "#464444";
  else if (level === "error") return "#940606";
  else return "#abab21";
}
