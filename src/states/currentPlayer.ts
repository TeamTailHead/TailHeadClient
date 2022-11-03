import { atom } from "recoil";

interface PlayerInfo {
  id: string;
  nickname: string;
}

export const currentPlayerAtom = atom<PlayerInfo>({
  key: "playerInfo",
  default: {
    id: "",
    nickname: "",
  },
});
