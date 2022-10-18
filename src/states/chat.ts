import { atom } from "recoil";

type Chat =
  | {
      type: "player";
      playerId: string;
      nickname: string;
      content: string;
      timestamp: Date;
    }
  | {
      type: "system";
      level: "info" | "warning" | "error";
      content: string;
      timestamp: Date;
    };

export const chatAtom = atom<Chat[]>({
  key: "chat",
  default: [],
});
