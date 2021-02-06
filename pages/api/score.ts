import { NextApiRequest, NextApiResponse } from "next";
import * as PinoLogger from 'pino'

const RoomService = require("@roomservice/node").default;
const API_KEY = process.env.ROOM_SERVICE_API_KEY
const rs = new RoomService(API_KEY);

const previousUpdate = Date.now();
const logger = PinoLogger()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (Date.now() - previousUpdate < 2000) return res.send(200)

  logger.info('Creating new coin')

  const checkpoint = await rs.checkpoint("demo");

  let map = checkpoint.map("board");

  map = map.set("coin", { x: Math.floor(Math.random() * 300), y: Math.floor(Math.random() * 300) });

  await checkpoint.save(map);

  res.send(200)
}

