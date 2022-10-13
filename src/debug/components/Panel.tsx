import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ipcRenderer } from "electron";
import { FC, useEffect } from "react";

const Panel: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fn = () => {
      onOpen();
    };

    ipcRenderer.on("open-debug-panel", fn);
    return () => {
      ipcRenderer.removeListener("open-debug-panel", fn);
    };
  }, []);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">디버그 패널</DrawerHeader>
        <DrawerBody />
      </DrawerContent>
    </Drawer>
  );
};

export default Panel;
