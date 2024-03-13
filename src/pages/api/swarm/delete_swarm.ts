import type { NextApiRequest, NextApiResponse } from 'next';
import config from '@configs/configLoader';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { authorization, 'content-type': contentType } = req.headers;
        const { swarm_id } = req.query;

        const headers: HeadersInit = {
            'Content-Type': contentType || 'application/json',
            'credentials': 'include',
        };

        if (authorization) {
            headers['Authorization'] = authorization;
        }

        const response = await fetch(`${config.delete_swarm_url}/${swarm_id}`, {
            method: 'DELETE',
            headers: headers,
            credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
            return res.status(200).json(data);
        } else {
            console.log(`Error deleting swarm with ID: ${swarm_id}`)
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
