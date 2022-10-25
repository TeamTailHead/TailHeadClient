import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilValue } from "recoil";

import { lobbyAdminIdAtom, lobbyPlayersAtom } from "@/states/lobby";

import PlayerListItem from "./PlayerListItem";

const PlayerList: FC = () => {
  const players = useRecoilValue(lobbyPlayersAtom);
  const adminId = useRecoilValue(lobbyAdminIdAtom);

  return (
    <StyledPlayerList>
      {players.map((player) => (
        <PlayerListItem
          nickname={player.nickname}
          isAdmin={player.id === adminId}
        />
      ))}
    </StyledPlayerList>
  );
};

export default PlayerList;

const StyledPlayerList = styled.div``;
