import { FC, useEffect } from "react";

import { useSetMessageHandler } from "@/communicator/context/communicator";

const PlayerChatWorker: FC = () => {
  const setHandler = useSetMessageHandler();

  useEffect(() => {
    setHandler("playerChat", ({ content, nickname, playerId }) => {
      console.log(content, nickname, playerId);
    });
  }, []);

  return null;
};

export default PlayerChatWorker;
