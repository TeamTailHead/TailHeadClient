import { FC, useEffect } from "react";

import { useSetMessageHandler } from "@/communicator/context/communicator";

const SystemChatWorker: FC = () => {
  const setHandler = useSetMessageHandler();

  useEffect(() => {
    setHandler("systemChat", ({ content, level }) => {
      console.log(content, level);
    });
  }, []);

  return null;
};

export default SystemChatWorker;
