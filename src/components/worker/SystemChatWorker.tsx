import { FC, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { useSetMessageHandler } from "@/communicator/context/communicator";
import { chatAtom } from "@/states/chat";

const SystemChatWorker: FC = () => {
  const setHandler = useSetMessageHandler();
  const setChat = useSetRecoilState(chatAtom);

  useEffect(() => {
    setHandler("systemChat", ({ content, level }) => {
      setChat((prev) => [
        ...prev,
        { type: "system", level, content, timestamp: new Date() },
      ]);
    });
  }, []);

  return null;
};

export default SystemChatWorker;
