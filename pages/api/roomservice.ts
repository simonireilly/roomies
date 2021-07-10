// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next"

const API_KEY = process.env.ROOM_SERVICE_API_KEY

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const roomService = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body
  const user = 'some-user-' + getRandomInt(1, 200)

  const r = await fetch('https://super.roomservice.dev/provision', {
    method: 'post',
    headers: {
      Authorization: `Bearer: ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: user,
      resources: body.resources
    })
  })

  const json = await r.json()
  res.json(json)
}

export default roomService