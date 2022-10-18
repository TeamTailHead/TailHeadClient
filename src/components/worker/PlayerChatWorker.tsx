import { FC, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { useSetMessageHandler } from "@/communicator/context/communicator";
import { chatAtom } from "@/states/chat";

const PlayerChatWorker: FC = () => {
  const setHandler = useSetMessageHandler();
  const setChat = useSetRecoilState(chatAtom);

  useEffect(() => {
    setHandler("playerChat", ({ content, nickname, playerId }) => {
      setChat((prev) => [
        ...prev,
        {
          type: "player",
          nickname,
          content,
          playerId,
          timestamp: new Date(),
        },
      ]);
    });
  }, []);

  return null;
};

export default PlayerChatWorker;
