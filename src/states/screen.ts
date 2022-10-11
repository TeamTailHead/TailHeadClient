import { atom } from "recoil";

export type ScreenState = "join" | "lobby" | "game" | "result" | "waiting";

export const screenStateAtom = atom<ScreenState>({
  key: "screenState",
  default: "join",
});
