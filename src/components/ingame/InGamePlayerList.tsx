import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilValue } from "recoil";

import { currentPlayerIdAtom, gamePlayersAtom } from "@/states/game";

import InGamePlayerListItem from "./InGamePlayerListItem";

const InGamePlayerList: FC = () => {
  const players = useRecoilValue(gamePlayersAtom);
  const currentPlayer = useRecoilValue(currentPlayerIdAtom);

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
