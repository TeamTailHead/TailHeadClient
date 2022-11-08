import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilValue } from "recoil";

import { currentPlayerAtom } from "@/states/currentPlayer";
import { resultAtom } from "@/states/result";
import { GameResult } from "@/states/result";

import Screen from "../common/Screen";
import ResultPlayer from "./ResultPlayser";

const ResultScreen: FC = () => {
  const result = useRecoilValue(resultAtom);
  const currentPlayer = useRecoilValue(currentPlayerAtom);

  const sorted = [...result];
  const currentPlayerId = currentPlayer.id;
  sorted.sort((a: GameResult, b: GameResult) => {
    return b.score - a.score;
  });

  return (
    <StyledResultScreen>
      <ResultScreenTitle>순위표</ResultScreenTitle>
      <ResultLobbyButton>로비로</ResultLobbyButton>
      <ResultScreenMain>
        {sorted.map((user, idx) => (
          <ResultPlayer
            key={user.id}
            ranking={idx + 1}
            nickname={user.nickname}
            score={user.score}
            isFirst={idx === 0}
            isMe={currentPlayerId === user.id}
          />
        ))}
      </ResultScreenMain>
    </StyledResultScreen>
  );
};

export default ResultScreen;

const StyledResultScreen = styled(Screen)`
  text-align: center;
  background-color: #e5e5e5;
`;

const ResultScreenTitle = styled.div`
  font-size: 300%;
  margin: 0 auto 5%;
  width: 200px;
  background-color: #b3b3b3;
  border-radius: 14px;
`;

const ResultScreenMain = styled.div`
  background-color: #b3b3b3;
  margin-left: 20%;
  margin-right: 20%;
  border-radius: 24px;
`;

const ResultLobbyButton = styled.button`
  display: flex;
  width: 100px;
  height: 50px;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: center;
  background: #f3f3f3;
  color: #868686;
  font-size: 120%;
  font-weight: bold;
  border-radius: 24px;
  position: fixed;
  right: 0;
  top: 0;
`;
