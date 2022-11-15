import styled from "@emotion/styled";
import { differenceInSeconds } from "date-fns";
import { FC, useEffect, useRef } from "react";

interface TimeBarProps {
  deadline: Date;
  turnTimestamp: Date;
  className?: string;
}

const TimeBar: FC<TimeBarProps> = ({ className, deadline, turnTimestamp }) => {
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
    <StyledTimebar className={className}>
      <Bar ref={ref} />
    </StyledTimebar>
  );
};

export default TimeBar;

const StyledTimebar = styled.div`
  background-color: gray;
  height: 10px;

  border-radius: 5px;
  overflow: hidden;
`;

const Bar = styled.div`
  background-color: #87278a;
  height: 100%;
  transition: width 0.2s;
`;