import { useState } from "react";
import styled from "styled-components";

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleCount = () => {
    setCount((count) => count + 1);
  };

  return (
    <StyledApp>
      <CounterButton onClick={handleCount}>Counter! {count}</CounterButton>
    </StyledApp>
  );
};

export default App;

const StyledApp = styled.div`
  background-color: black;
  color: white;
`;

const CounterButton = styled.button``;
