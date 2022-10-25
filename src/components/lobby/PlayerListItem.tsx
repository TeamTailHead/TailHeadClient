import styled from "@emotion/styled";
import { FC } from "react";

interface PlayerListItemProps {
  nickname: string;
  isAdmin: boolean;
}

const PlayerListItem: FC<PlayerListItemProps> = ({
  nickname: name,
  isAdmin,
}) => {
  return (
    <StyledPlayerListItem>
      <Name>{name}</Name>
      {isAdmin ? <p>방장</p> : null}
    </StyledPlayerListItem>
  );
};

export default PlayerListItem;

const StyledPlayerListItem = styled.div`
  display: flex;
`;

const Name = styled.div``;
