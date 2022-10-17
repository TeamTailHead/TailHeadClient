import { Button } from "@chakra-ui/react";
import { FC } from "react";

interface SubmitButtonProps {
  isLoading?: boolean;
}

const SubmitButton: FC<SubmitButtonProps> = ({ isLoading }) => {
  return (
    <Button mt={4} colorScheme="teal" isLoading={isLoading} type="submit">
      전송
    </Button>
  );
};

export default SubmitButton;
