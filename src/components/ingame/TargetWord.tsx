import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FC } from "react";

import { glassOverlayStyle } from "@/styles/glass";

interface TargetWordProps {
  word: string;
  highlight: boolean;
}

const TargetWord: FC<TargetWordProps> = ({ word, highlight }) => {
  return (
    <StyledTargetWord>
      {[...word].map((char, idx) => (
        <CharBlock key={idx} highlight={highlight}>
          {char}
        </CharBlock>
      ))}
    </StyledTargetWord>
  );
};

export default TargetWord;

const StyledTargetWord = styled.div`
  display: flex;
`;

const CharBlock = styled.div<{ highlight: boolean }>`
  ${glassOverlayStyle}

  margin-right: 6px;

  color: white;

  height: 50px;
  width: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 30px;

  transition: background-color 0.4s;

  ${(props) =>
    props.highlight
      ? css`
          background-color: rgba(128, 0, 128, 0.8);
        `
      : css`
          background-color: rgba(119, 89, 119, 0.8);
        `}
`;
