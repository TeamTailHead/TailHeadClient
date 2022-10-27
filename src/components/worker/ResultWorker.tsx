import { FC, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { useSetMessageHandler } from "@/communicator/context/communicator";
import { resultAtom } from "@/states/result";
import { screenStateAtom } from "@/states/screen";

const ResultWorker: FC = () => {
  const setHandler = useSetMessageHandler();
  const setScreenState = useSetRecoilState(screenStateAtom);
  const setResult = useSetRecoilState(resultAtom);

  useEffect(() => {
    setHandler("gameResult", ({ players }) => {
      setResult(
        players.map((player) => ({
          id: player.id,
          nickname: player.nickname,
          score: player.score,
        }))
      );
      setScreenState("result");
    });
  }, []);

  return null;
};

export default ResultWorker;
