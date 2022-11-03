import { atom } from "recoil";

export interface GamePlayer {
  id: string;
  nickname: string;
}

export const gamePlayersAtom = atom<GamePlayer[]>({
  key: "gamePlayers",
  default: [],
});

export const currentPlayerIdAtom = atom<string>({
  key: "currentPlayerId",
  default: "",
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

export const turnSequence = atom<number>({
  key: "turnSequnece",
  default: 0,
});
