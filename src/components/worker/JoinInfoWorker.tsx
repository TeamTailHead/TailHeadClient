import { FC, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { useSetMessageHandler } from "@/communicator/context/communicator";
import { currentPlayerAtom } from "@/states/currentPlayer";
import { joinStatusAtom } from "@/states/join";
import { screenStateAtom } from "@/states/screen";

const JoinInfoWorker: FC = () => {
  const setHandler = useSetMessageHandler();
  const setScreenState = useSetRecoilState(screenStateAtom);
  const setJoinError = useSetRecoilState(joinStatusAtom);
  const setCurrentPlayer = useSetRecoilState(currentPlayerAtom);

  useEffect(() => {
    setHandler("joinInfo", ({ playerId, nickname }) => {
      setJoinError({
        state: "idle",
      });
      setCurrentPlayer({
        id: playerId,
        nickname,
      });
      setScreenState("lobby");
    });
  }, []);

  return null;
};

export default JoinInfoWorker;
