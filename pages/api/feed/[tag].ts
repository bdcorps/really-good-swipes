import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { tag } = req.query;
  const posts = await prisma.swipe.findMany({
    where: {
      tags: {
        hasEvery: tag
      }
    },
  })
  res.json(posts)
}
