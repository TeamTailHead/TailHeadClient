import { atom } from "recoil";

interface ReceivedMessage {
  type: string;
  data: unknown;
  timestamp: Date;
}

interface SendedMessage {
  type: string;
  data: unknown;
  timestamp: Date;
}

export const receivedMessageAtom = atom<ReceivedMessage[]>({
  key: "receivedMessage",
  default: [],
});

export const sendedMessageAtom = atom<SendedMessage[]>({
  key: "sendedMessage",
  default: [],
});
