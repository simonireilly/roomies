// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

const API_KEY = process.env.ROOM_SERVICE_API_KEY

const roomService = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const session = await getSession({ req })
  const { userId } = session

  const body = req.body

  const r = await fetch('https://super.roomservice.dev/provision', {
    method: 'post',
    headers: {
      Authorization: `Bearer: ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: userId,
      resources: body.resources,
    }),
  })

  const json = await r.json()
  res.json(json)
}

export default roomService
