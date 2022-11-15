import styled from "@emotion/styled";
import { differenceInSeconds } from "date-fns";
import { FC, useEffect, useRef } from "react";

interface TimeBarProps {
  deadline: Date;
  turnTimestamp: Date;
}

const TimeBar: FC<TimeBarProps> = ({ deadline, turnTimestamp }) => {
  const totalSeconds = differenceInSeconds(deadline, turnTimestamp);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const process = () => {
      const remainingSeconds = differenceInSeconds(deadline, new Date());
      const percentage = (remainingSeconds * 100) / totalSeconds;
      if (ref.current) {
        ref.current.style.width = `${percentage}%`;
      }

      cancelToken = requestAnimationFrame(process);
    };

    let cancelToken = requestAnimationFrame(process);

    return () => {
      cancelAnimationFrame(cancelToken);
    };
  }, [deadline, turnTimestamp]);

  return (
    <StyledTimebar>
      <Bar ref={ref} />
    </StyledTimebar>
  );
};

export default TimeBar;

const StyledTimebar = styled.div`
  background-color: gray;
  height: 40px;
  width: 100%;
`;

const Bar = styled.div`
  background-color: green;
  height: 40px;
`;
