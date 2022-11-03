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
  //isFirst,
}) => {
  return (
    <StyledResultPlyaer>
      <Ranking>{ranking}등</Ranking>
      <Name>{name}님</Name>
      <Score>{score}점</Score>
    </StyledResultPlyaer>
  );
};

export default ResultPlayer;

const StyledResultPlyaer = styled.div``;

const Name = styled.div``;

const Score = styled.div``;

const Ranking = styled.div``;
