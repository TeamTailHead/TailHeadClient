import styled from "@emotion/styled";
import { FC, useState } from "react";
import { useRecoilState } from "recoil";

import { useSendMessage } from "@/communicator";
import { joinStatusAtom } from "@/states/join";
import { glassCardStyle } from "@/styles/glass";

import Screen from "../common/Screen";

const JoinScreen: FC = () => {
  const send = useSendMessage();
  const [joinStatus, setJoinStatus] = useRecoilState(joinStatusAtom);

  const [nickname, setNickname] = useState("");

  const handleJoin = () => {
    setJoinStatus({
      state: "loading",
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
            접속하기
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

  color: #000000;
`;

const CenterBox = styled.div`
  ${glassCardStyle}

  width: 400px;
  padding: 20px 20px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 30px;
  font-weight: 500;
`;

const NicknameForm = styled.div`
  display: flex;
  margin-top: 20px;
`;

const NicknameInput = styled.input`
  flex-grow: 1;
  padding: 10px 15px;
  border: none;
  background: rgba(164, 164, 164, 0.23);
  border-radius: 10px;
  transition: background-color 0.3s;

  &:focus,
  &:hover {
    background: rgba(109, 109, 109, 0.23);
  }
`;

const JoinButton = styled.button`
  background-color: rgba(115, 85, 150, 0.8);
  margin-left: 10px;
  padding: 5px 15px;
  border-radius: 5px;
  border: none;
  color: white;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: rgba(115, 85, 150, 0.95);
  }
`;

const JoinErrorMessage = styled.p`
  color: red;
  display: block;
  margin-top: 10px;
`;
