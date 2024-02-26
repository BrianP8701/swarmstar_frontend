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

        const response = await fetch(config.auth_token_url, {
            method: 'GET',
            credentials: 'include',
            headers: headers,
        });
        const data = await response.json();
        if (response.ok) {
            return res.status(200).json(data);
        } else {
            throw new Error(data.error);
        }
    } catch (error: unknown) {
        console.error(error);
        let errorMessage: string;
        if (error instanceof Error) {
            errorMessage = error.message;
        } else {
            errorMessage = String(error);
        }
        throw new Error(errorMessage);
    }
}
