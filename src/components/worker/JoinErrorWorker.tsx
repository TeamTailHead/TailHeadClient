import { FC, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { useSetMessageHandler } from "@/communicator/context/communicator";
import { joinStatusAtom } from "@/states/join";
import { screenStateAtom } from "@/states/screen";

const JoinErrorWorker: FC = () => {
  const setHandler = useSetMessageHandler();
  const setJoinStatus = useSetRecoilState(joinStatusAtom);
  const setScreenState = useSetRecoilState(screenStateAtom);

  useEffect(() => {
    setHandler("joinError", ({ message }) => {
      setJoinStatus({
        status: "error",
        message,
      });
      setScreenState("join");
    });
  }, []);

  return null;
};

export default JoinErrorWorker;
