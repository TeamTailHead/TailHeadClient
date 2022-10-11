import { atom } from "recoil";

export const playerInfoAtom = atom({
  key: "playerInfo",
  default: {
    nickname: "",
  },
});
