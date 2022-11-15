import styled from "@emotion/styled";
import { FC } from "react";

interface ResultPlayerProps {
  nickname: string;
  score: number;
  ranking: number;
  isFirst: boolean;
  isMe: boolean;
}

const ResultPlayer: FC<ResultPlayerProps> = ({
  nickname: name,
  score,
  ranking,
  isFirst,
  isMe,
}) => {
  return (
    <StyledResultFirstPlyaer isFirst={isFirst}>
      <StyledResultPlyaer isMe={isMe}>
        <Ranking isFirst={isFirst}>{ranking}등</Ranking>
        <Name isFirst={isFirst}>{name}</Name>
        <Score isFirst={isFirst}>{score}점</Score>
      </StyledResultPlyaer>
    </StyledResultFirstPlyaer>
  );
};

export default ResultPlayer;

const StyledResultPlyaer = styled.div<{ isMe: boolean }>`
  display: flex;
  flex-grow: 1;
  color: ${(props) => (props.isMe === true ? "#fe4949" : "none")};
  border-radius: inherit;
`;

const StyledResultFirstPlyaer = styled.div<{ isFirst: boolean }>`
  display: flex;
  flex-grow: 1;
  background-color: ${(props) => (props.isFirst === true ? "#e1e951" : "none")};
  border-radius: inherit;
`;

const Ranking = styled.div<{ isFirst: boolean }>`
  margin-top: 2%;
  margin-bottom: 2%;
  margin-right: auto;
  margin-left: 2%;
  font-weight: ${(props) => (props.isFirst === true ? "1000" : "500")};
`;

const Name = styled.div<{ isFirst: boolean }>`
  margin: 2% auto;
  font-weight: ${(props) => (props.isFirst === true ? "1000" : "500")};
`;

const Score = styled.div<{ isFirst: boolean }>`
  margin-top: 2%;
  margin-bottom: 2%;
  margin-left: auto;
  margin-right: 2%;
  font-weight: ${(props) => (props.isFirst === true ? "1000" : "500")};
`;
