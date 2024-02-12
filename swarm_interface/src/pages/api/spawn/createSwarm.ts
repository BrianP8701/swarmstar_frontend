import type { NextApiRequest, NextApiResponse } from 'next';
import config from '@configs/configLoader';

export default async function addNewSwarm(req: NextApiRequest, res: NextApiResponse) {
    const { swarm_name } = req.body;
    console.log("newSwarmName: \n\n", swarm_name)
    console.log("req.headers: \n\n", req.headers)
    try {
        const response = await fetch(config.create_swarm_url, {
            method: 'POST',
            headers: req.headers as HeadersInit,
            body: JSON.stringify({ swarm_name }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json({ error: errorData.error || 'An error occurred' });
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
