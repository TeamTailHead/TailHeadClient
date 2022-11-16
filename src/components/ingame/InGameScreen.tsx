import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilValue } from "recoil";

import {
  deadlineAtom,
  isMyTurnSelector,
  lastWordAtom,
  turnTimeStampAtom,
} from "@/states/game";
import { glassCardStyle } from "@/styles/glass";

import ChatList from "../common/chat/ChatList";
import Screen from "../common/Screen";
import InGamePlayerList from "./InGamePlayerList";
import TargetWord from "./TargetWord";
import TimeBar from "./TimeBar";
import TimeNumber from "./TimeNumber";

const InGameScreen: FC = () => {
  const lastWord = useRecoilValue(lastWordAtom);
  const turnTimestamp = useRecoilValue(turnTimeStampAtom);
  const deadLineTime = useRecoilValue(deadlineAtom);
  const isMyTurn = useRecoilValue(isMyTurnSelector);

  return (
    <StyledInGameScreen>
      <LeftSide>
        <GameCard>
          <TargetWordBox>
            <TargetWord word={lastWord} highlight={isMyTurn} />
          </TargetWordBox>
          <StyledTimeBar
            deadline={deadLineTime}
            turnTimestamp={turnTimestamp}
          />
          <TimeNumber deadline={deadLineTime} turnTimestamp={turnTimestamp} />
        </GameCard>
        <PlayerCard>
          <PlayersBoxDown>
            <PlayersBox>
              <InGamePlayerList />
            </PlayersBox>
          </PlayersBoxDown>
        </PlayerCard>
      </LeftSide>

      <RightSide>
        <ChatList />
      </RightSide>
    </StyledInGameScreen>
  );
};

export default InGameScreen;

const StyledInGameScreen = styled(Screen)`
  display: flex;

  padding: 10vh 10vw;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;

  width: 500px;
`;

const RightSide = styled.div`
  flex-grow: 1;

  display: flex;
  align-items: stretch;
  margin-left: 10px;
  height: 100%;
`;

const GameCard = styled.div`
  ${glassCardStyle}

  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledTimeBar = styled(TimeBar)`
  margin: 20px 20px 10px 20px;
  align-self: stretch;
`;

const TargetWordBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PlayerCard = styled.div`
  ${glassCardStyle}

  margin-top: 10px;
`;

const PlayersBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const PlayersBoxDown = styled.div`
  display: flex;
`;
