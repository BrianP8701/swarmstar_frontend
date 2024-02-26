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

        const response = await fetch(config.login_url, {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: JSON.stringify(req.body), 
        });
        const data = await response.json();
        if (response.ok) {
            return res.status(200).json(data);
        } else {
            console.log(req.body)
            console.log(data.error)
            return res.status(response.status).json({ error: data.detail });
        }
    } catch (error: unknown) {
        console.error(error);
        let errorMessage: string;
        if (error instanceof Error) {
            errorMessage = error.message;
        } else {
            errorMessage = String(error);
        }
        return res.status(500).json({ error: errorMessage });
    }
}
