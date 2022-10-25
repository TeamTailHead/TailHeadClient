import { atom } from "recoil";

type JoinError =
  | {
      isError: false;
    }
  | { isError: true; message: string };

export const joinErrorAtom = atom<JoinError>({
  key: "joinError",
  default: { isError: false },
});
