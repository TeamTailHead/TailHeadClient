import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FC } from "react";
import { FaCrown } from "react-icons/fa";
import { MdPerson } from "react-icons/md";

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
      <PersonIcon isMe={isMe} />
      <Name isAdmin={isAdmin} isMe={isMe}>
        {name}
      </Name>
      {isAdmin && <AdminIcon />}
    </StyledPlayerListItem>
  );
};

export default PlayerListItem;

const StyledPlayerListItem = styled.div`
  margin-left: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const PersonIcon = styled(MdPerson)<{ isMe: boolean }>`
  ${(props) =>
    props.isMe
      ? css`
          color: #7e107e;
        `
      : css`
          color: black;
        `}

  margin-right: 5px;
  height: 20px;
`;

const AdminIcon = styled(FaCrown)`
  color: #f2f200;
  margin-left: 5px;
  transform: translateY(-2px);
`;

const Name = styled.div<{ isAdmin: boolean; isMe: boolean }>`
  font-size: 18px;

  ${(props) =>
    props.isMe
      ? css`
          font-weight: 500;
          color: #702770;
        `
      : css`
          font-weight: 400;
          color: black;
        `};
`;
