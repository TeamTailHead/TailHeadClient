import { FC, ReactElement, useMemo } from "react";

interface ScreenSelectorProps {
  selectedKey: string;
  screens: Array<{
    key: string;
    component: ReactElement;
  }>;
}

const ScreenSelector: FC<ScreenSelectorProps> = ({ selectedKey, screens }) => {
  const selectedScreen = useMemo(() => {
    const selectedScreen = screens.find((screen) => screen.key === selectedKey);
    return selectedScreen?.component ?? <>Unimplemented Screen</>;
  }, [selectedKey, screens]);

  return selectedScreen;
};

export default ScreenSelector;
