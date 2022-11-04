import { FC, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { useSetMessageHandler } from "@/communicator/context/communicator";
import {
  currentPlayerIdAtom,
  deadlineAtom,
  gamePlayersAtom,
  lastWordAtom,
  turnSequenceAtom,
} from "@/states/game";
import { screenStateAtom } from "@/states/screen";

const GameInfoWorker: FC = () => {
  const setHandler = useSetMessageHandler();
  const setScreenState = useSetRecoilState(screenStateAtom);
  const setGamePlayers = useSetRecoilState(gamePlayersAtom);
  const setCurrentPlayerId = useSetRecoilState(currentPlayerIdAtom);
  const setLastWord = useSetRecoilState(lastWordAtom);
  const setDeadLine = useSetRecoilState(deadlineAtom);
  const setTurnSequence = useSetRecoilState(turnSequenceAtom);

  useEffect(() => {
    setHandler(
      "gameTurnInfo",
      ({ currentPlayerId, deadline, lastWord, players, turnSequence }) => {
        setCurrentPlayerId(currentPlayerId);
        setLastWord(lastWord);
        setDeadLine(deadline);
        setTurnSequence(turnSequence);
        setGamePlayers(
          players.map((player) => ({
            id: player.id,
            nickname: player.nickname,
            score: player.score,
          }))
        );
        setScreenState("game");
      }
    );
  }, []);

  return null;
};

export default GameInfoWorker;
