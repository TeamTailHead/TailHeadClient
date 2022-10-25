import { atom } from "recoil";

type JoinStatus =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string };

export const joinStatusAtom = atom<JoinStatus>({
  key: "joinStatus",
  default: { status: "idle" },
});

type JoinError =
  | {
      isError: false;
    }
  | { isError: true; message: string };

export const joinErrorAtom = atom<JoinError>({
  key: "joinError",
  default: { isError: false },
});
