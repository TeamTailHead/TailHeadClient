import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilValue } from "recoil";

import { useSendMessage } from "@/communicator";
import { currentPlayerAtom } from "@/states/currentPlayer";
import { lobbyAdminIdAtom } from "@/states/lobby";
import {
  glassButtonStyle,
  glassCardStyle,
  glassDividerStyle,
  primaryGlassButtonColorStyle,
} from "@/styles/glass";

import Screen from "../common/Screen";
import LobbyChat from "./LobbyChat";
import PlayerList from "./PlayerList";

const LobbyScreen: FC = () => {
  const adminId = useRecoilValue(lobbyAdminIdAtom);
  const currentPlayer = useRecoilValue(currentPlayerAtom);

  const send = useSendMessage();

  const handleGameStart = () => {
    send("startGame", {});
  };

  const currentPlayerId = currentPlayer.id;
  const isAdmin = currentPlayerId === adminId;

  return (
    <Screen>
      <LobbyScreenBox>
        <LobbyUpperBox>
          <PlayerListCard>
            <GameTitle>TailHead 대기실</GameTitle>
            <StyledPlayerList />
            {isAdmin && (
              <StartButton onClick={handleGameStart} disabled={!isAdmin}>
                게임 시작!
              </StartButton>
            )}
          </PlayerListCard>
          <LobbyChat />
        </LobbyUpperBox>
      </LobbyScreenBox>
    </Screen>
  );
};

export default LobbyScreen;

const LobbyScreenBox = styled.div`
  width: 80%;
  height: 100%;

  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 40px;

  display: flex;
  flex-direction: column;
`;

const LobbyUpperBox = styled.div`
  display: flex;
  align-items: stretch;
  height: 100%;
`;

const PlayerListCard = styled.div`
  ${glassCardStyle}

  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;

  font-size: 20px;

  padding: 10px 0;
`;

const GameTitle = styled.h2`
  ${glassDividerStyle}

  padding-bottom: 13px;
  font-size: 30px;
  padding-left: 10px;
  font-weight: 500;
`;

const StyledPlayerList = styled(PlayerList)`
  flex-grow: 1;
`;

const StartButton = styled.button`
  ${glassButtonStyle}
  ${primaryGlassButtonColorStyle}

  margin: 0 10px;
  display: flex;
  border-radius: 12px;

  justify-content: center;
  align-items: center;

  font-weight: bold;
`;
