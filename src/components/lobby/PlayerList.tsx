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
  border-radius: 24px;
  width: 20vw;
  height: 50vh;
  margin-top: 3vh;

  overflow: auto;
  flex-direction: column;
  background: #eaeaea;
`;
