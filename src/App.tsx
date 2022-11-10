import styled from "@emotion/styled";
import { ReactElement } from "react";
import { useRecoilValue } from "recoil";

import ScreenSelector from "./components/common/ScreenSelector";
import ConnectionStatus from "./components/connection/ConnectionStatus";
import JoinScreen from "./components/join/JoinScreen";
import LobbyScreen from "./components/lobby/LobbyScreen";
import ResultScreen from "./components/result/ResultScreen";
import { connectionStatusAtom } from "./states/connection";
import { ScreenState, screenStateAtom } from "./states/screen";
import GlobalStyle from "./styles/GlobalStyle";

const screens: Array<{ key: ScreenState; component: ReactElement }> = [
  { key: "join", component: <JoinScreen /> },
  { key: "lobby", component: <LobbyScreen /> },
  { key: "result", component: <ResultScreen /> },
];

type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";

const App: React.FC = () => {
  const screenState = useRecoilValue(screenStateAtom);
  const connectionStatus = useRecoilValue(connectionStatusAtom);

  return (
    <StyledApp>
      <GlobalStyle />
      <ScreenSelector selectedKey={screenState} screens={screens} />
      <ConnectionStatus status={connectionStatus} />
    </StyledApp>
  );
};

export default App;

const StyledApp = styled.div`
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;

  background-color: white;
  color: black;
`;
