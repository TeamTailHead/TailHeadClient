import styled from "@emotion/styled";
import { FC } from "react";

interface InGameChatSystemProps {
  level: string;
  content: string;
}

const InGameChatSystem: FC<InGameChatSystemProps> = ({ level, content }) => {
  return (
    <InGameChatSystemStyle>
      {level} : {content}
    </InGameChatSystemStyle>
  );
};

export default InGameChatSystem;

const InGameChatSystemStyle = styled.div``;
