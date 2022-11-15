import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";

import { currentPlayerAtom } from "@/states/currentPlayer";
import { resultAtom } from "@/states/result";
import { GameResult } from "@/states/result";
import { screenStateAtom } from "@/states/screen";
import {
  glassButtonStyle,
  glassCardStyle,
  primaryGlassButtonColorStyle,
} from "@/styles/glass";

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
      <StyledResultBox>
        <ResultScreenTitle>순위표</ResultScreenTitle>

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

        <ResultLobbyButton onClick={toLobby}>로비</ResultLobbyButton>
      </StyledResultBox>
    </StyledResultScreen>
  );
};

export default ResultScreen;

const StyledResultScreen = styled(Screen)`
  display: flex;
  flex-direction: column;
  overflow: auto;
  justify-content: center;
  align-items: center;
`;

const StyledResultBox = styled.div`
  ${glassCardStyle}
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const ResultScreenTitle = styled.div`
  text-align: center;
  font-size: 35px;
  margin-top: 10px;
  margin-bottom: 30px;
`;

const ResultScreenMain = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
`;

const ResultLobbyButton = styled.button`
  ${glassButtonStyle}
  ${primaryGlassButtonColorStyle}
  padding: 15px;
`;
