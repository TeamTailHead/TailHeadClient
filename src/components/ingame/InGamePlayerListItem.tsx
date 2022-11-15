import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FC } from "react";
import { MdPerson } from "react-icons/md";

interface InGamePlayerListItemProps {
  nickname: string;
  score: number;
  isThisTurn: boolean;
}

const InGamePlayerListItem: FC<InGamePlayerListItemProps> = ({
  nickname: name,
  score,
  isThisTurn,
}) => {
  return (
    <StyledInGamePlayerListItem isMe={false} isThisTurn={isThisTurn}>
      <PersonIcon size="50" />
      <Name>{name}</Name>
      <Score>{score} 점</Score>
    </StyledInGamePlayerListItem>
  );
};

export default InGamePlayerListItem;

const StyledInGamePlayerListItem = styled.div<{
  isMe: boolean;
  isThisTurn: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 5px;

  ${(props) =>
    props.isMe
      ? css`
          color: #702770;
          fill: #702770;
        `
      : ""}

  ${(props) =>
    props.isThisTurn
      ? css`
          color: #702770;
          fill: #702770;
        `
      : ""}
`;

const PersonIcon = styled(MdPerson)``;

const Name = styled.div`
  font-size: 20px;
`;

const Score = styled.div`
  margin-top: 6px;
  font-size: 14px;
`;
