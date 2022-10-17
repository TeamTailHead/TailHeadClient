import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import { ipcRenderer } from "electron";
import { FC, useEffect } from "react";

import ReceivedMessagePanel from "./panels/ReceivedMessagePanel";
import SendedMessagePanel from "./panels/SendedMessagePanel";
import SendMessagePanel from "./panels/SendMessagePanel";

const DebugView: FC = () => {
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
        <DrawerBody padding={0}>
          <Tabs>
            <TabList>
              <Tab>메시지 전송</Tab>
              <Tab>수신 내역</Tab>
              <Tab>발신 내역</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SendMessagePanel />
              </TabPanel>
              <TabPanel>
                <ReceivedMessagePanel />
              </TabPanel>
              <TabPanel>
                <SendedMessagePanel />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DebugView;
