import type { NextApiRequest, NextApiResponse } from 'next';
import config from '@configs/configLoader';

export default async function addNewSwarm(req: NextApiRequest, res: NextApiResponse) {
    const { newSwarmName } = req.body;

    try {
        const response = await fetch(config.create_swarm_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ new_swarm_name: newSwarmName }),
        });

        if (!response.ok) {
            throw new Error(`Creating swarm failed with status: ${response.status}`);
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
