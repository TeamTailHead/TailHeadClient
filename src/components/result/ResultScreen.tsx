import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";

import { currentPlayerAtom } from "@/states/currentPlayer";
import { resultAtom } from "@/states/result";
import { GameResult } from "@/states/result";
import { screenStateAtom } from "@/states/screen";

import Screen from "../common/Screen";
import ResultPlayer from "./ResultPlayser";

const ResultScreen: FC = () => {
  const result = useRecoilValue(resultAtom);
  const currentPlayer = useRecoilValue(currentPlayerAtom);
  const setScreenState = useSetRecoilState(screenStateAtom);

  const sorted = [...result];
  const currentPlayerId = currentPlayer.id;
  sorted.sort((a: GameResult, b: GameResult) => {
    return b.score - a.score;
  });

  const toLobby = () => {
    setScreenState("lobby");
  };

  return (
    <StyledResultScreen>
      <ResultScreenTitle>순위표</ResultScreenTitle>
      <ResultLobbyButton onClick={toLobby}>로비로</ResultLobbyButton>
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
  display: flex;
  flex-direction: column;

  overflow: auto;
  width: 100vw;
  height: 100vh;
`;

const ResultScreenTitle = styled.div`
  display: flex;
  border-radius: 24px;
  border: 2px solid black;

  justify-content: center;
  margin: 5vh auto;
  width: 20vw;

  font-size: 4vw;
  background-color: #d7e6ff;
  color: black;
`;

const ResultScreenMain = styled.div`
  border: 2px solid black;
  margin-left: 20vw;
  margin-right: 20vw;
  margin-bottom: 5vh;
  border-radius: 24px;
  background-color: #d7e6ff;
  color: black;
`;

const ResultLobbyButton = styled.button`
  width: 8vw;
  height: 5vh;

  background-color: #d7e6ff;
  color: black;
  font-size: 1.5vw;
  font-weight: bold;
  border-radius: 24px;

  border: 2px solid black;
  position: fixed;
  right: 3vw;
  top: 5vh;
`;
