import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { ServerMessage } from "@tailhead/communicator/dist/message";
import { FC } from "react";
import { useForm } from "react-hook-form";

import SubmitButton from "./common/SubmitButton";

type SystemChat = ServerMessage["systemChat"];

interface SystemChatFormProps {
  onSubmit(data: SystemChat): Promise<void>;
}

const SystemChatForm: FC<SystemChatFormProps> = ({ onSubmit }) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<SystemChat>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel>level</FormLabel>
        <Select {...register("level")}>
          <option value="info">info</option>
          <option value="warning">warning</option>
          <option value="error">error</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>content</FormLabel>
        <Input
          id="systemChat-content"
          placeholder=""
          {...register("content")}
        />
      </FormControl>
      <SubmitButton isLoading={isSubmitting} />
    </form>
  );
};

export default SystemChatForm;
