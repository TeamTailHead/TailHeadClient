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
  font-weight: ${(props) => (props.isAdmin === true ? "1000" : "500")};
  background: ${(props) => (props.isAdmin === true ? "#e1e951" : "")};
  font-size: inherit;
  color: ${(props) => (props.isMe === true ? "#fe4949" : "black")};
`;
