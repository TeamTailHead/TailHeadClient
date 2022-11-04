import styled from "@emotion/styled";
import { FC } from "react";

interface InGamePlayerListItemProps {
  nickname: string;
  score: number;
  isCurrentPlayer: boolean;
}

const InGamePlayerListItem: FC<InGamePlayerListItemProps> = ({
  nickname: name,
  score,
  isCurrentPlayer,
}) => {
  return (
    <StyledInGamePlayerListItem>
      <InGameName>{name}</InGameName>
      {isCurrentPlayer ? <p>현재 차례</p> : null}
      {score}
    </StyledInGamePlayerListItem>
  );
};

export default InGamePlayerListItem;

const StyledInGamePlayerListItem = styled.div`
  display: flex;
`;

const InGameName = styled.div``;
