import { atom } from "recoil";

type JoinStatus =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string };

export const joinStatusAtom = atom<JoinStatus>({
  key: "joinStatus",
  default: { status: "idle" },
});
