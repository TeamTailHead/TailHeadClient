import { FC } from "react";

import GameInfoWorker from "./GameInfoWorker";
import JoinErrorWorker from "./JoinErrorWorker";
import LobbyInfoWorker from "./LobbyInfoWorker";
import PlayerChatWorker from "./PlayerChatWorker";
import ResultWorker from "./ResultWorker";
import SystemChatWorker from "./SystemChatWorker";

export const CommunicatorWorker: FC = () => {
  return (
    <>
      <GameInfoWorker />
      <PlayerChatWorker />
      <SystemChatWorker />
      <JoinErrorWorker />
      <LobbyInfoWorker />
      <ResultWorker />
    </>
  );
};
