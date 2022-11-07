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
      <Ranking isFirst={isFirst}>{ranking}등</Ranking>
      <Name isFirst={isFirst}>{name}</Name>
      <Score isFirst={isFirst}>{score}점</Score>
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

const Ranking = styled.div<{ isFirst: boolean }>`
  margin-top: 2%;
  margin-bottom: 2%;
  margin-right: auto;
  margin-left: 2%;
  color: ${(props) => (props.isFirst === true ? "yellow" : "black")};
  font-weight: ${(props) => (props.isFirst === true ? "bold" : "normal")};
`;

const Name = styled.div<{ isFirst: boolean }>`
  margin: 2% auto;
  color: ${(props) => (props.isFirst === true ? "yellow" : "black")};
  font-weight: ${(props) => (props.isFirst === true ? "bold" : "normal")};
`;

const Score = styled.div<{ isFirst: boolean }>`
  margin-top: 2%;
  margin-bottom: 2%;
  margin-left: auto;
  margin-right: 2%;
  color: ${(props) => (props.isFirst === true ? "yellow" : "black")};
  font-weight: ${(props) => (props.isFirst === true ? "bold" : "normal")};
`;
