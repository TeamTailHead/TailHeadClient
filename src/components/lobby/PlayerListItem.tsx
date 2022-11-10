import styled from "@emotion/styled";
import { FC } from "react";

interface PlayerListItemProps {
  nickname: string;
  isAdmin: boolean;
  isMe: boolean;
}

const PlayerListItem: FC<PlayerListItemProps> = ({
  nickname: name,
  isAdmin,
  isMe,
}) => {
  return (
    <StyledPlayerListItem>
      <Name isAdmin={isAdmin} isMe={isMe}>
        {name}
      </Name>
    </StyledPlayerListItem>
  );
};

export default PlayerListItem;

const StyledPlayerListItem = styled.div`
  display: flex;
  margin-left: 1vw;
  margin-bottom: 2vh;
`;

const Name = styled.div<{ isAdmin: boolean; isMe: boolean }>`
  font-weight: ${(props) => (props.isAdmin === true ? "bold" : "normal")};
  font-size: inherit;
  color: ${(props) => (props.isMe === true ? "blue" : "black")};
`;
