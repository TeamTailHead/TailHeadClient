import { atom } from "recoil";

type ConnectionStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "disconnected"
  | "error";

export const connectionStatusAtom = atom<ConnectionStatus>({
  key: "connectionStatus",
  default: "idle",
});
