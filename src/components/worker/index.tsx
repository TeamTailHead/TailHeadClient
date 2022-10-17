import { FC } from "react";

import PlayerChatWorker from "./PlayerChatWorker";
import SystemChatWorker from "./SystemChatWorker";

export const CommunicatorWorker: FC = () => {
  return (
    <>
      <PlayerChatWorker />
      <SystemChatWorker />
    </>
  );
};
