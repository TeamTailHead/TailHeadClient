import { css, Global } from "@emotion/react";
import emotionReset from "emotion-reset";
import { FC } from "react";

const globalStyle = css`
  ${emotionReset}

  * {
    box-sizing: border-box;
    font-size: 100%;
  }

  :not(input):not(textarea),
  :not(input):not(textarea)::after,
  :not(input):not(textarea)::before {
    -webkit-user-select: none;
    user-select: none;
  }

  input,
  button,
  textarea,
  :focus {
    outline: none;
  }
`;

const GlobalStyle: FC = () => {
  return <Global styles={globalStyle} />;
};

export default GlobalStyle;
