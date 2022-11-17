import { FC, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { useSetMessageHandler } from "@/communicator/context/communicator";
import { lobbyAdminIdAtom, lobbyPlayersAtom } from "@/states/lobby";

const LobbyInfoWorker: FC = () => {
  const setHandler = useSetMessageHandler();
  const setLobbyPlayers = useSetRecoilState(lobbyPlayersAtom);
  const setLobbyAdminId = useSetRecoilState(lobbyAdminIdAtom);

  useEffect(() => {
    setHandler("lobbyInfo", ({ adminId, players }) => {
      setLobbyAdminId(adminId);
      setLobbyPlayers(
        players.map((player) => ({
          id: player.id,
          nickname: player.nickname,
        }))
      );
    });
  }, []);

  return null;
};

export default LobbyInfoWorker;
