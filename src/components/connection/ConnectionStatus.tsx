import styled from "@emotion/styled";
import { FC } from "react";

import Screen from "../common/Screen";

interface ConnectionStatusProps {
  status: "connecting" | "connected" | "disconnected" | "error";
}

const ConnectionStatus: FC<ConnectionStatusProps> = ({ status }) => {
  if (status === "connected") {
    return null;
  }

  return (
    <StyledConnectionStatus>
      <ConnectionDisplay>
        {(() => {
          if (status === "connecting") {
            return <ConnectionText>연결중...</ConnectionText>;
          } else if (status === "disconnected") {
            return <ConnectionText>연결이 끊어졌습니다.</ConnectionText>;
          } else if (status === "error") {
            return <ConnectionText>연결에 오류가 발생했습니다.</ConnectionText>;
          }
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
  width: 300px;
  padding: 30px 0;

  background-color: #ffffff;
`;

const ConnectionText = styled.div`
  color: black;
  text-align: center;
`;
