import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const apiRes = await fetch('http://localhost:3001/api/v1/patients');

    if (!apiRes.ok) {
      throw new Error(`Error: ${apiRes.status} ${apiRes.statusText}`);
    }

    const data = await apiRes.json();
    res.status(200).json(data);
    console.log('Endpoint /api/v1/patients called');
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ error: 'Failed to load patients' });
  }
}
