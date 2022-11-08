import { css, Global } from "@emotion/react";
import emotionReset from "emotion-reset";
import { FC } from "react";

const globalStyle = css`
  ${emotionReset}

  * {
    box-sizing: border-box;
    font-size: 100%;
  }

  html {
    font-family: "Pretendard Variable", Pretendard, -apple-system,
      BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
      "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
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
