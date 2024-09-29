import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiRes = await fetch('http://localhost:3000/api/v1/patients', {
    headers: {
      // Add any necessary headers here
    },
  })
  const data = await apiRes.json()
  res.status(200).json(data)
}
