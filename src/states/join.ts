import { atom } from "recoil";

type JoinStatus =
  | {
      state: "idle";
    }
  | {
      state: "loading";
    }
  | {
      state: "error";
      message: string;
    };

export const joinStatusAtom = atom<JoinStatus>({
  key: "joinStatus",
  default: {
    state: "idle",
  },
});
