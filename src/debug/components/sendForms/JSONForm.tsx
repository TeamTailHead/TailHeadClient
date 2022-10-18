import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { atomFamily, useRecoilState } from "recoil";
import { z, ZodType } from "zod";

interface JSONFormProps<T> {
  formKey: string;
  validator: ZodType<T>;
  onSubmit(data: T): Promise<void>;
  defaultValue: T;
}

const formFamily = atomFamily<string | null, string>({
  key: "JSONFormDataFamily",
  default: null,
});

const JSONForm = <T,>({
  formKey,
  validator,
  onSubmit,
  defaultValue,
}: JSONFormProps<T>) => {
  const [json, setJson] = useRecoilState(formFamily(formKey));

  const parsed = useMemo(
    () => parseJSON(validator, json ?? ""),
    [validator, json]
  );

  useEffect(() => {
    if (json === null) {
      resetToDefault();
    }
  }, []);

  const handleSubmit = () => {
    if (parsed.success) {
      onSubmit(parsed.data);
    }
  };

  const resetToDefault = () => {
    setJson(JSON.stringify(defaultValue, null, 2));
  };

  return (
    <Box>
      <FormControl isInvalid={!parsed.success}>
        <Textarea
          size="md"
          minHeight="200px"
          value={json ?? ""}
          onChange={(e) => setJson(e.target.value)}
        />
        <FormHelperText></FormHelperText>
        {!parsed.success ? (
          <FormErrorMessage>{parsed.error}</FormErrorMessage>
        ) : null}
      </FormControl>
      <Button
        colorScheme="teal"
        onClick={handleSubmit}
        isDisabled={!parsed.success}
      >
        전송
      </Button>
      <Button onClick={resetToDefault} ml={3}>
        리셋
      </Button>
    </Box>
  );
};

export default JSONForm;

type ParseJSONResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function parseJSON<T>(
  validator: z.ZodType<T>,
  json: string
): ParseJSONResult<T> {
  try {
    const obj = JSON.parse(json, jsonDateResolver) as unknown;
    const parsed = validator.parse(obj);
    return { success: true, data: parsed };
  } catch (err) {
    if (err instanceof SyntaxError) {
      return { success: false, error: `Invalid JSON: ${err.message}` };
    }
    if (err instanceof z.ZodError) {
      return { success: false, error: JSON.stringify(err.format(), null, 2) };
    }
    throw err;
  }
}

const jsonDateResolver = (_key: string, value: unknown) => {
  if (typeof value === "string" && value.match(/.+T.+Z/)) {
    const timestamp = Date.parse(value);

    if (!isNaN(timestamp)) {
      return new Date(timestamp);
    }
  }
  return value;
};
