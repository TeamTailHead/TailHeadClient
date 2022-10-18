import { FC, useState } from "react";
import { useRecoilState } from "recoil";

import { useSendMessage } from "@/communicator";
import { joinStatusAtom } from "@/states/join";

import Screen from "../common/Screen";

const JoinScreen: FC = () => {
  const send = useSendMessage();
  const [joinStatus, setJoinStatus] = useRecoilState(joinStatusAtom);
  const [nickname, setNickname] = useState("");

  const handleJoin = () => {
    send("join", {
      nickname,
    });
    setJoinStatus({
      status: "loading",
    });
  };

  return (
    <Screen>
      JoinScreen
      <input value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <button onClick={handleJoin}>JOIN</button>
      {joinStatus.status === "loading" ? "Loading" : null}
      {joinStatus.status === "error" ? joinStatus.message : null}
    </Screen>
  );
};

export default JoinScreen;
