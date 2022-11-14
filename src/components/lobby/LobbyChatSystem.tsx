import styled from "@emotion/styled";
import { FC } from "react";

interface LobbyChatSystemProps {
  level: string;
  content: string;
}

const LobbyChatSystem: FC<LobbyChatSystemProps> = ({ level, content }) => {
  return (
    <LobbyChatSystemStyle>
      {level} : {content}
    </LobbyChatSystemStyle>
  );
};

export default LobbyChatSystem;

const LobbyChatSystemStyle = styled.div`
  font-weight: 600;
  color: #eb6d6d;
`;
