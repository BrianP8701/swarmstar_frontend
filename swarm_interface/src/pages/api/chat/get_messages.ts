import type { NextApiRequest, NextApiResponse } from 'next';
import config from '@configs/configLoader';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { node_id } = req.query;
        if (!node_id) {
            return res.status(400).json({ error: 'Missing node_id parameter' });
        }

        const url = `${config.get_messages_url}?node_id=${node_id}`;

        const { authorization, 'content-type': contentType } = req.headers;

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'credentials': 'include',
        };

        if (authorization) {
            headers['Authorization'] = authorization;
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
            credentials: 'include'
        });
        const data = await response.json();
        if (response.ok) {
            return res.status(200).json(data);
        } else {
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
