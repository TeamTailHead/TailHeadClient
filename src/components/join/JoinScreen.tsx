import { FC } from "react";

import { useSendMessage } from "@/communicator";

import Screen from "../common/Screen";

const JoinScreen: FC = () => {
  const send = useSendMessage();

  return (
    <Screen>
      JoinScreen
      <button onClick={() => send("sendChat", { content: "asdf" })}>
        JOIN
      </button>
    </Screen>
  );
};

export default JoinScreen;
