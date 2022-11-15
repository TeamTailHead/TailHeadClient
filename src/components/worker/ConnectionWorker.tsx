import { FC, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { useConnection } from "@/communicator/context/connection";
import { connectionStateAtom } from "@/states/connection";

const ConnectionWorker: FC = () => {
  const connection = useConnection();

  const setConnectionStatus = useSetRecoilState(connectionStateAtom);

  useEffect(() => {
    connection.setOnError((error) => {
      setConnectionStatus({ status: "error", error });
    });

    connection.setOnDisconnect(() => {
      setConnectionStatus({ status: "disconnected" });
    });
  }, []);

  return null;
};

export default ConnectionWorker;
