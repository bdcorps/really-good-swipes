import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


// POST /api/swipe
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { link, text, tags } = req.body
  const result = await prisma.swipe.create({
    data: {
      link, text, tags
    },
  })
  res.json(result)
}
