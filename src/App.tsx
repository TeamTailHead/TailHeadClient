import { useState } from "react";
import styled from "styled-components";

import GlobalStyle from "./styles/GlobalStyle";

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleCount = () => {
    setCount((count) => count + 1);
  };

  return (
    <StyledApp>
      <GlobalStyle />
      <CounterButton onClick={handleCount}>Counter! {count}</CounterButton>
    </StyledApp>
  );
};

export default App;

const StyledApp = styled.div`
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;

  background-color: black;
  color: white;
`;

const CounterButton = styled.button``;
