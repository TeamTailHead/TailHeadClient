import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";

import { connectionStateAtom } from "@/states/connection";
import { joinStatusAtom } from "@/states/join";
import { screenStateAtom } from "@/states/screen";

import Screen from "../common/Screen";

const ConnectionStatus: FC = () => {
  const [state, setState] = useRecoilState(connectionStateAtom);
  const setScreenState = useSetRecoilState(screenStateAtom);
  const resetJoinState = useResetRecoilState(joinStatusAtom);

  if (state.status === "connected" || state.status === "idle") {
    return null;
  }

  const goMain = () => {
    setScreenState("join");
    setState({ status: "idle" });
    resetJoinState();
  };

  return (
    <StyledConnectionStatus>
      <ConnectionDisplay>
        {(() => {
          if (state.status === "connecting") {
            return <ConnectionText>연결중...</ConnectionText>;
          } else if (state.status === "disconnected") {
            return (
              <ConnectionText>서버와의 연결이 끊어졌습니다.</ConnectionText>
            );
          } else if (state.status === "error") {
            return (
              <>
                <ConnectionText>
                  {"서버와의 연결에 실패했습니다.\n" + String(state.error)}
                </ConnectionText>
                <ActionButton onClick={goMain}>처음으로</ActionButton>
              </>
            );
          }
          return null;
        })()}
      </ConnectionDisplay>
    </StyledConnectionStatus>
  );
};

export default ConnectionStatus;

const StyledConnectionStatus = styled(Screen)`
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.45);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConnectionDisplay = styled.div`
  width: 400px;
  padding: 30px 0;

  background-color: #ffffff;
`;

const ConnectionText = styled.p`
  color: black;
  text-align: center;
  white-space: pre-wrap;
`;

const ActionButton = styled.button`
  display: block;
  margin: 20px auto 0 auto;

  border: none;
  padding: 5px 10px;

  cursor: pointer;

  background-color: #eaeaea;

  &:hover {
    background-color: #dadada;
  }
`;
