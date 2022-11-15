import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilValue } from "recoil";

import { currentPlayerAtom } from "@/states/currentPlayer";
import { lobbyAdminIdAtom, lobbyPlayersAtom } from "@/states/lobby";

import PlayerListItem from "./PlayerListItem";

interface PlayerListProps {
  className?: string;
}

const PlayerList: FC<PlayerListProps> = ({ className }) => {
  const players = useRecoilValue(lobbyPlayersAtom);
  const adminId = useRecoilValue(lobbyAdminIdAtom);

  const currentPlayer = useRecoilValue(currentPlayerAtom);
  const currentPlayerId = currentPlayer.id;

  return (
    <StyledPlayerList className={className}>
      {players.map((player) => (
        <PlayerListItem
          key={player.id}
          nickname={player.nickname}
          isAdmin={player.id === adminId}
          isMe={currentPlayerId === player.id}
        />
      ))}
    </StyledPlayerList>
  );
};

export default PlayerList;

const StyledPlayerList = styled.div`
  display: flex;
  border-radius: 24px;

  overflow: auto;
  flex-direction: column;
  min-height: 0;
`;
