import styled from "@emotion/styled";
import { FC } from "react";
import { useRecoilValue } from "recoil";

import { deadlineAtom, lastWordAtom, turnTimeStampAtom } from "@/states/game";
import { glassCardStyle } from "@/styles/glass";

import ChatList from "../common/chat/ChatList";
import Screen from "../common/Screen";
import InGamePlayerList from "./InGamePlayerList";
import TimeBar from "./TimeBar";

const InGameScreen: FC = () => {
  const LastWord = useRecoilValue(lastWordAtom);
  // const DeadLine = useRecoilValue(deadlineAtom);
  const turnTimestamp = useRecoilValue(turnTimeStampAtom);
  const deadLineTime = useRecoilValue(deadlineAtom);

  return (
    <StyledInGameScreen>
      <LeftSide>
        <GameCard>
          <TimeBar deadline={deadLineTime} turnTimestamp={turnTimestamp} />
          <LastWordDesign>{LastWord}</LastWordDesign>
          <GameInformation>제한 시간 안에 단어를 입력해주세요.</GameInformation>
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
  flex-direction: column;
  margin-left: 10px;
`;

const GameCard = styled.div`
  ${glassCardStyle}

  flex-grow: 1;
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

const LastWordDesign = styled.div`
  display: flex;
`;

const GameInformation = styled.div`
  display: flex;
`;
