import { ServerMessage } from "@tailhead/communicator/dist/message";
import { z } from "zod";

export const serverMessageValidators = [
  makeMessageInfo(
    "joinInfo",
    z.object({
      playerId: z.string(),
      nickname: z.string(),
    }),
    {
      playerId: "AAA",
      nickname: "A",
    }
  ),
  makeMessageInfo(
    "lobbyInfo",
    z.object({
      adminId: z.string(),
      players: z.array(
        z.object({
          id: z.string(),
          nickname: z.string(),
        })
      ),
    }),
    {
      adminId: "ABC",
      players: [{ id: "ABC", nickname: "Hello" }],
    }
  ),

  makeMessageInfo(
    "gameTurnInfo",
    z.object({
      turnSequence: z.number(),
      players: z.array(
        z.object({
          id: z.string(),
          nickname: z.string(),
          score: z.number(),
        })
      ),
      currentPlayerId: z.string(),
      lastWord: z.string(),
      deadline: z.date(),
    }),
    {
      turnSequence: 1,
      currentPlayerId: "AAA",
      players: [
        { id: "AAA", nickname: "A", score: 200 },
        { id: "BBB", nickname: "B", score: 300 },
      ],
      lastWord: "김밥",
      deadline: new Date(),
    }
  ),
  makeMessageInfo(
    "playerChat",
    z.object({
      playerId: z.string(),
      nickname: z.string(),
      content: z.string(),
    }),
    {
      playerId: "ABC",
      nickname: "Hello",
      content: "World",
    }
  ),
  makeMessageInfo(
    "systemChat",
    z.object({
      level: z.enum(["info", "warning", "error"]),
      content: z.string(),
    }),
    {
      level: "info",
      content: "SystemChatInfo",
    }
  ),
  makeMessageInfo(
    "gameResult",
    z.object({
      players: z.array(
        z.object({
          id: z.string(),
          nickname: z.string(),
          score: z.number(),
        })
      ),
    }),
    {
      players: [
        {
          id: "AAA",
          nickname: "A",
          score: 200,
        },
        {
          id: "BBB",
          nickname: "B",
          score: 300,
        },
        {
          id: "CCC",
          nickname: "씨씨씨씨씨씨씨씨씨씨",
          score: 999,
        },
        {
          id: "DDD",
          nickname: "가나다라마바사아자차",
          score: 888,
        },
        {
          id: "EEE",
          nickname: "닉네임은10글자까지",
          score: 567,
        },
        {
          id: "FFF",
          nickname: "펩시제로가더맛있음!",
          score: 345,
        },
        {
          id: "GGG",
          nickname: "지지지지베이베베이베",
          score: 666,
        },
      ],
    }
  ),
  makeMessageInfo(
    "joinError",
    z.object({
      message: z.string(),
    }),
    {
      message: "joinError",
    }
  ),
];

function makeMessageInfo<K extends keyof ServerMessage>(
  key: K,
  validator: z.ZodType<ServerMessage[K]>,
  defaultValue: ServerMessage[K]
) {
  return { key, validator, defaultValue };
}
