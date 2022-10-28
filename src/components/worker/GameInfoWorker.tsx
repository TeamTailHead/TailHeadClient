import { FC, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { useSetMessageHandler } from "@/communicator/context/communicator";
import {
  currentPlayerIdAtom,
  deadlineAtom,
  gamePlayersAtom,
  lastWordAtom,
  turnSequence,
  wordHistoryAtom,
} from "@/states/game";
import { screenStateAtom } from "@/states/screen";

const GameInfoWorker: FC = () => {
  const setHandler = useSetMessageHandler();
  const setScreenState = useSetRecoilState(screenStateAtom);
  const setGamePlayers = useSetRecoilState(gamePlayersAtom);
  const setCurrentPlayerId = useSetRecoilState(currentPlayerIdAtom);
  const setLastWord = useSetRecoilState(lastWordAtom);
  const setDeadLine = useSetRecoilState(deadlineAtom);
  const setTurnSequence = useSetRecoilState(turnSequence);
  const setHistoryWord = useSetRecoilState(wordHistoryAtom);

  useEffect(() => {
    setHandler(
      "gameTurnInfo",
      ({
        currentPlayerId,
        deadline,
        lastWord,
        players,
        turnSequence,
        wordHistoryAtom,
      }) => {
        setCurrentPlayerId(currentPlayerId);
        setLastWord(lastWord);
        setDeadLine(deadline);
        setTurnSequence(turnSequence);
        setHistoryWord(wordHistoryAtom);
        setGamePlayers(
          players.map((player) => ({
            id: player.id,
            nickname: player.nickname,
          }))
        );
        setScreenState("game");
      }
    );
  }, []);

  return null;
};

export default GameInfoWorker;
