// pages/api/authCheck.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import config from '@configs/configLoader';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    const response = await fetch(config.authentication_url, {
      method: 'GET',
      headers: req.headers as HeadersInit,
    });

    if (response.ok) {
      res.status(200).json({ isAuthenticated: true });
    } else {
      res.status(401).json({ isAuthenticated: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ isAuthenticated: false });
  }
}
