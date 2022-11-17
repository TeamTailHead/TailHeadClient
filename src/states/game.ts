import { atom, selector } from "recoil";

import { currentPlayerAtom } from "./currentPlayer";

export interface GamePlayer {
  id: string;
  nickname: string;
  score: number;
}

export const gamePlayersAtom = atom<GamePlayer[]>({
  key: "gamePlayers",
  default: [],
});

export const thisTurnPlayerIdAtom = atom<string>({
  key: "thisTurnPlayerId",
  default: "",
});

export const isMyTurnSelector = selector<boolean>({
  key: "isMyTurn",
  get({ get }) {
    const thisTurnPlayerId = get(thisTurnPlayerIdAtom);
    const currentPlayer = get(currentPlayerAtom);

    return thisTurnPlayerId === currentPlayer.id;
  },
});

export const wordHistoryAtom = atom<string[]>({
  key: "wordHistory",
  default: [],
});

export const lastWordAtom = atom<string>({
  key: "lastWord",
  default: "",
});

export const deadlineAtom = atom<Date>({
  key: "deadline",
  default: new Date(),
});

export const turnTimeStampAtom = atom<Date>({
  key: "turnTimeStamp",
  default: new Date(),
});

export const turnSequenceAtom = atom<number>({
  key: "turnSequnece",
  default: 0,
});
