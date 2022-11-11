import { atom } from "recoil";

type ConnectionState =
  | { status: "idle" }
  | { status: "connecting" }
  | { status: "connected" }
  | { status: "disconnected" }
  | { status: "error"; error: Error };

export const connectionStateAtom = atom<ConnectionState>({
  key: "connectionStatus",
  default: { status: "idle" },
});
