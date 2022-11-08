import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilValue } from "recoil";

import { currentPlayerAtom } from "@/states/currentPlayer";
import { lobbyAdminIdAtom, lobbyPlayersAtom } from "@/states/lobby";

import PlayerListItem from "./PlayerListItem";

const PlayerList: FC = () => {
  const players = useRecoilValue(lobbyPlayersAtom);
  const adminId = useRecoilValue(lobbyAdminIdAtom);

  const currentPlayer = useRecoilValue(currentPlayerAtom);
  const currentPlayerId = currentPlayer.id;

  return (
    <StyledPlayerList>
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
  flex-direction: column;
  background: #eaeaea;
  border-radius: 24px;
  margin-left: 15px;
  margin-top: 30px;
`;
