import { FC } from "react";
import { useRecoilValue } from "recoil";

import { resultAtom } from "@/states/result";

import Screen from "../common/Screen";

const ResultScreen: FC = () => {
  const result = useRecoilValue(resultAtom);

  return (
    <Screen>
      ResultScreen
      <p>{JSON.stringify(result)}</p>
    </Screen>
  );
};

export default ResultScreen;
