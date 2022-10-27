import { atom } from "recoil";

export interface GameResult {
  id: string;
  nickname: string;
  score: number;
}

export const resultAtom = atom<GameResult[]>({
  key: "result",
  default: [],
});
