import type { NextApiRequest, NextApiResponse } from 'next';
import config from '@configs/configLoader';

export default async function deleteSwarm(req: NextApiRequest, res: NextApiResponse) {
    const { swarm_id } = req.body;

    try {
        const response = await fetch(config.delete_swarm_url, {
            method: 'DELETE',
            headers: req.headers as HeadersInit,
            body: JSON.stringify({ swarm_id }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
