import { ServerMessage } from "@tailhead/communicator/dist/message";
import { z } from "zod";

export const serverMessageValidators = [
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
