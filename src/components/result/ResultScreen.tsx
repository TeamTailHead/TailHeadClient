import { FC } from "react";
import { useRecoilValue } from "recoil";

import { resultAtom } from "@/states/result";
import { GameResult } from "@/states/result";

import Screen from "../common/Screen";

const ResultScreen: FC = () => {
  const result = useRecoilValue(resultAtom);

  const sorted = [...result];
  sorted.sort((a: GameResult, b: GameResult) => {
    return b.score - a.score;
  });

  return (
    <Screen>
      ResultScreen
      {sorted.map((user) => (
        <div key={user.id}>
          <span>{user.nickname}님 </span>
          <span>{user.score}점</span>
        </div>
      ))}
    </Screen>
  );
};

export default ResultScreen;
