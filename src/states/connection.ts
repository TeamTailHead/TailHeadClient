import { atom } from "recoil";

type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";

export const connectionStatusAtom = atom<ConnectionStatus>({
  key: "connectionStatus",
  default: "connecting",
});
