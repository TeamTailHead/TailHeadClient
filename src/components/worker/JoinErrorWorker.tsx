import { FC, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { useSetMessageHandler } from "@/communicator/context/communicator";
import { joinErrorAtom } from "@/states/join";
import { screenStateAtom } from "@/states/screen";

const JoinErrorWorker: FC = () => {
  const setHandler = useSetMessageHandler();
  const setJoinError = useSetRecoilState(joinErrorAtom);
  const setScreenState = useSetRecoilState(screenStateAtom);

  useEffect(() => {
    setHandler("joinError", ({ message }) => {
      setJoinError({
        isError: true,
        message,
      });
      setScreenState("join");
    });
  }, []);

  return null;
};

export default JoinErrorWorker;
