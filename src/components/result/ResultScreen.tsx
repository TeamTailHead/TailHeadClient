import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilValue } from "recoil";

import { resultAtom } from "@/states/result";
import { GameResult } from "@/states/result";

import Screen from "../common/Screen";
import ResultPlayer from "./ResultPlayser";

const ResultScreen: FC = () => {
  const result = useRecoilValue(resultAtom);

  const sorted = [...result];
  sorted.sort((a: GameResult, b: GameResult) => {
    return b.score - a.score;
  });

  return (
    <StyledResultScreen>
      ResultScreen
      {sorted.map((user, idx) => (
        <ResultPlayer
          key={user.id}
          ranking={idx + 1}
          nickname={user.nickname}
          score={user.score}
          isFirst={idx === 0}
        />
      ))}
    </StyledResultScreen>
  );
};

export default ResultScreen;

const StyledResultScreen = styled(Screen)`
  text-align: center;
`;
