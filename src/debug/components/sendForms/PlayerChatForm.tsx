import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { ServerMessage } from "@tailhead/communicator/dist/message";
import { FC } from "react";
import { useForm } from "react-hook-form";

type PlayerChat = ServerMessage["playerChat"];

interface PlayerChatFormProps {
  onSubmit(data: PlayerChat): Promise<void>;
}

const PlayerChatForm: FC<PlayerChatFormProps> = ({ onSubmit }) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<PlayerChat>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel>playerId</FormLabel>
        <Input
          id="playerChat-playerId"
          placeholder="playerId"
          {...register("playerId")}
        />
      </FormControl>
      <FormControl>
        <FormLabel>nickname</FormLabel>
        <Input
          id="playerChat-nickname"
          placeholder="nickname"
          {...register("nickname")}
        />
      </FormControl>
      <FormControl>
        <FormLabel>content</FormLabel>
        <Input
          id="playerChat-content"
          placeholder="content"
          {...register("content")}
        />
      </FormControl>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        전송
      </Button>
    </form>
  );
};

export default PlayerChatForm;
