import { atom } from "recoil";

export interface LobbyPlayer {
  id: string;
  nickname: string;
}

export const lobbyPlayersAtom = atom<LobbyPlayer[]>({
  key: "lobbyPlayers",
  default: [],
});

export const lobbyAdminIdAtom = atom<string>({
  key: "lobbyAdminId",
  default: "",
});
