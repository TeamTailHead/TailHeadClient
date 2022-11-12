import styled from "@emotion/styled";
import { FC, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { useSendMessage } from "@/communicator";
import { useConnection } from "@/communicator/context/connection";
import { connectionStateAtom } from "@/states/connection";
import { joinStatusAtom } from "@/states/join";

import Screen from "../common/Screen";

const JoinScreen: FC = () => {
  const connection = useConnection();

  const send = useSendMessage();
  const [joinStatus, setJoinStatus] = useRecoilState(joinStatusAtom);
  const setConnectionStatus = useSetRecoilState(connectionStateAtom);

  const [nickname, setNickname] = useState("");

  const handleJoin = async () => {
    setJoinStatus({
      state: "loading",
    });
    setConnectionStatus({ status: "connecting" });
    connection.setOnError((error) => {
      setConnectionStatus({ status: "error", error });
    });
    await connection.connect();
    setConnectionStatus({ status: "connected" });
    connection.setOnDisconnect(() => {
      setConnectionStatus({ status: "disconnected" });
    });

    send("join", {
      nickname,
    });
  };

  return (
    <StyledScreen>
      <CenterBox>
        <Title>TailHead 끝말잇기</Title>
        <NicknameForm>
          <NicknameInput
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임 입력"
          />
          <JoinButton
            onClick={handleJoin}
            disabled={joinStatus.state === "loading"}
          >
            시작하기
          </JoinButton>
        </NicknameForm>
        {joinStatus.state === "error" ? (
          <JoinErrorMessage>
            접속에 실패했습니다: {joinStatus.message}
          </JoinErrorMessage>
        ) : null}
      </CenterBox>
    </StyledScreen>
  );
};

export default JoinScreen;

const StyledScreen = styled(Screen)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterBox = styled.div`
  background-color: #ebebeb;
  width: 400px;
  padding: 20px 20px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 30px;
  font-weight: 600;
`;

const NicknameForm = styled.div`
  display: flex;
  margin-top: 20px;
`;

const NicknameInput = styled.input`
  border: 1px solid grey;
  flex-grow: 1;
  padding: 0 10px;
  border-radius: 5px;
`;

const JoinButton = styled.button`
  background-color: #9bcdff;
  margin-left: 5px;
  padding: 5px 10px;
  border-radius: 5px;

  &:hover {
    background-color: #89c4ff;
  }
`;

const JoinErrorMessage = styled.p`
  color: red;
  display: block;
  margin-top: 10px;
`;
