import styled from "@emotion/styled";
import { FC, useState } from "react";
import { useRecoilValue } from "recoil";

import { useSendMessage } from "@/communicator";
import { joinErrorAtom } from "@/states/join";

import Screen from "../common/Screen";

const JoinScreen: FC = () => {
  const send = useSendMessage();
  const [nickname, setNickname] = useState("");
  const joinError = useRecoilValue(joinErrorAtom);

  const handleJoin = () => {
    send("join", {
      nickname,
    });
  };

  return (
    <Screen>
      JoinScreen
      <div>
        <NicknameInput
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <button onClick={handleJoin}>JOIN</button>
      </div>
      <div>
        {joinError.isError ? (
          <p>접속에 실패했습니다: {joinError.message}</p>
        ) : null}
      </div>
    </Screen>
  );
};

export default JoinScreen;

const NicknameInput = styled.input`
  border: 1px solid grey;
`;
