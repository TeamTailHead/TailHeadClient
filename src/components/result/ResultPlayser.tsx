import styled from "@emotion/styled";
import { FC } from "react";
import { TfiCrown } from "react-icons/tfi";

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
    <StyledResultPlyaer isMe={isMe} isFirst={isFirst}>
      <Ranking isFirst={isFirst}>{ranking}등</Ranking>
      <Name isFirst={isFirst}>
        {isFirst && <FirstIcon />}
        {name}
        {isFirst && <FirstIcon />}
      </Name>
      <Score isFirst={isFirst}>{score}점</Score>
    </StyledResultPlyaer>
  );
};

export default ResultPlayer;

const StyledResultPlyaer = styled.div<{ isMe: boolean; isFirst: boolean }>`
  display: flex;
  color: ${(props) => (props.isMe === true ? "#702770" : "none")};

  margin-bottom: 30px;

  justify-content: space-between;
`;

const Ranking = styled.div<{ isFirst: boolean }>`
  margin-left: 20px;
  font-weight: ${(props) => (props.isFirst === true ? "700" : "inherit")};
`;

const Name = styled.div<{ isFirst: boolean }>`
  font-weight: ${(props) => (props.isFirst === true ? "700" : "inherit")};
`;

const Score = styled.div<{ isFirst: boolean }>`
  margin-right: 20px;
  font-weight: ${(props) => (props.isFirst === true ? "700" : "inherit")};
`;

const FirstIcon = styled(TfiCrown)`
  color: red;
  margin-left: 5px;
  margin-right: 5px;
  transform: translateY(-2px);
`;
