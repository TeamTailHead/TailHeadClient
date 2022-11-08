import { FC } from "react";

import GameInfoWorker from "./GameInfoWorker";
import JoinErrorWorker from "./JoinErrorWorker";
import JoinInfoWorker from "./JoinInfoWorker";
import LobbyInfoWorker from "./LobbyInfoWorker";
import PlayerChatWorker from "./PlayerChatWorker";
import ResultWorker from "./ResultWorker";
import SystemChatWorker from "./SystemChatWorker";

export const CommunicatorWorker: FC = () => {
  return (
    <>
      <JoinInfoWorker />
      <GameInfoWorker />
      <PlayerChatWorker />
      <SystemChatWorker />
      <JoinErrorWorker />
      <LobbyInfoWorker />
      <ResultWorker />
    </>
  );
};
