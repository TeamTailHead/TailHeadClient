import styled from "@emotion/styled";
import { differenceInSeconds } from "date-fns";
import { FC, useEffect, useRef } from "react";

import { glassOverlayStyle } from "@/styles/glass";

interface TimeNumberProps {
  deadline: Date;
  turnTimestamp: Date;
  className?: string;
}

const TimeNumber: FC<TimeNumberProps> = ({
  deadline,
  turnTimestamp,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const process = () => {
      const remainingSeconds = differenceInSeconds(deadline, new Date());
      if (ref.current) {
        ref.current.innerText =
          remainingSeconds >= 0 ? `${Math.floor(remainingSeconds)}` : "0";
      }

      cancelToken = requestAnimationFrame(process);
    };

    let cancelToken = requestAnimationFrame(process);

    return () => {
      cancelAnimationFrame(cancelToken);
    };
  }, [deadline, turnTimestamp]);

  return (
    <StyledTimeNumber ref={ref} className={className}>
      0
    </StyledTimeNumber>
  );
};

export default TimeNumber;

const StyledTimeNumber = styled.div`
  ${glassOverlayStyle}

  width: fit-content;
  min-width: 50px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;
