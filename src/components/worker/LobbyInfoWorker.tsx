import { FC, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { useSetMessageHandler } from "@/communicator/context/communicator";
import { lobbyAdminIdAtom, lobbyPlayersAtom } from "@/states/lobby";
import { screenStateAtom } from "@/states/screen";

const LobbyInfoWorker: FC = () => {
  const setHandler = useSetMessageHandler();
  const setScreenState = useSetRecoilState(screenStateAtom);
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
      setScreenState("lobby");
    });
  }, []);

  return null;
};

export default LobbyInfoWorker;
