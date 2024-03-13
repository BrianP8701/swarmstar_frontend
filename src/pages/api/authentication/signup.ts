import type { NextApiRequest, NextApiResponse } from 'next';
import config from '@configs/configLoader';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { authorization, 'content-type': contentType } = req.headers;

        const headers: HeadersInit = {
            'Content-Type': contentType || 'application/json',
            'credentials': 'include',
        };

        if (authorization) {
            headers['Authorization'] = authorization;
        }

        const response = await fetch(config.signup_url, {
            method: 'PUT',
            headers: headers,
            credentials: 'include',
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        if (response.ok) {
            return res.status(200).json(data);
        } else {

            return res.status(response.status).json({ error: data.detail });
        }
    } catch (error: unknown) {
        let errorMessage: string;
        if (error instanceof Error) {
            errorMessage = error.message;
        } else {
            errorMessage = String(error);
        }
        return res.status(500).json({ error: errorMessage });
    }

}
