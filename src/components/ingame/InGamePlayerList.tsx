import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilValue } from "recoil";

import { gamePlayersAtom, thisTurnPlayerIdAtom } from "@/states/game";

import InGamePlayerListItem from "./InGamePlayerListItem";

const InGamePlayerList: FC = () => {
  const players = useRecoilValue(gamePlayersAtom);
  const currentPlayer = useRecoilValue(thisTurnPlayerIdAtom);

  return (
    <StyledInGamePlayerList>
      {players.map((player) => (
        <InGamePlayerListItem
          key={player.id}
          nickname={player.nickname}
          score={player.score}
          isCurrentPlayer={player.nickname === currentPlayer}
        />
      ))}
    </StyledInGamePlayerList>
  );
};

export default InGamePlayerList;

const StyledInGamePlayerList = styled.div``;
