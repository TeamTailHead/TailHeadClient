import { FC } from "react";

import JoinErrorWorker from "./JoinErrorWorker";
import PlayerChatWorker from "./PlayerChatWorker";
import SystemChatWorker from "./SystemChatWorker";

export const CommunicatorWorker: FC = () => {
  return (
    <>
      <PlayerChatWorker />
      <SystemChatWorker />
      <JoinErrorWorker />
    </>
  );
};
