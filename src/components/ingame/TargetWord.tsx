import styled from "@emotion/styled";
import { FC } from "react";

import { glassOverlayStyle } from "@/styles/glass";

interface TargetWordProps {
  word: string;
}

const TargetWord: FC<TargetWordProps> = ({ word }) => {
  return (
    <StyledTargetWord>
      {[...word].map((char, idx) => (
        <CharBlock key={idx}>{char}</CharBlock>
      ))}
    </StyledTargetWord>
  );
};

export default TargetWord;

const StyledTargetWord = styled.div`
  display: flex;
`;

const CharBlock = styled.div`
  ${glassOverlayStyle}

  margin-right: 6px;

  background-color: rgb(128, 0, 128, 0.8);
  color: white;

  height: 50px;
  width: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 30px;
`;
