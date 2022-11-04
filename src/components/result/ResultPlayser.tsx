import styled from "@emotion/styled";
import { FC } from "react";

interface ResultPlayerProps {
  nickname: string;
  score: number;
  ranking: number;
  isFirst: boolean;
}

const ResultPlayer: FC<ResultPlayerProps> = ({
  nickname: name,
  score,
  ranking,
  isFirst,
}) => {
  return (
    <StyledResultPlyaer>
      {isFirst ? (
        <>
          <RankingFirst>{ranking}등</RankingFirst>
          <NameFirst>{name}</NameFirst>
          <ScoreFirst>{score}점</ScoreFirst>
        </>
      ) : (
        <>
          <Ranking>{ranking}등</Ranking>
          <Name>{name}</Name>
          <Score>{score}점</Score>
        </>
      )}
    </StyledResultPlyaer>
  );
};

export default ResultPlayer;

const StyledResultPlyaer = styled.div`
  display: flex;
  background-color: #b3b3b3;
  flex-grow: 1;
  margin-left: 20%;
  margin-right: 20%;
`;

const Ranking = styled.div`
  margin-top: 2%;
  margin-bottom: 2%;
  margin-right: auto;
  margin-left: 2%;
`;

const Name = styled.div`
  margin: 2% auto;
`;

const Score = styled.div`
  margin-top: 2%;
  margin-bottom: 2%;
  margin-left: auto;
  margin-right: 2%;
`;

const RankingFirst = styled.div`
  margin-top: 2%;
  margin-bottom: 2%;
  margin-right: auto;
  margin-left: 2%;
  color: yellow;
  font-weight: bold;
`;

const NameFirst = styled.div`
  margin: 2% auto;
  color: yellow;
  font-weight: bold;
`;

const ScoreFirst = styled.div`
  margin-top: 2%;
  margin-bottom: 2%;
  margin-left: auto;
  margin-right: 2%;
  color: yellow;
  font-weight: bold;
`;
