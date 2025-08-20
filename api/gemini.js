// api/gemini.js

const fetch = require('node-fetch');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        const { prompt } = JSON.parse(event.body);
        const geminiApiKey = process.env.GEMINI_API_KEY;

        // Log para debuggear: Te mostrará si la variable se está cargando.
        console.log('API key is:', geminiApiKey ? 'configured' : 'not configured');

        if (!geminiApiKey) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'API key not configured' }),
            };
        }

        const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`;

        const geminiBody = {
            contents: [{
                parts: [{
                    text: prompt,
                }],
            }],
        };

        const response = await fetch(geminiApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(geminiBody),
        });

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};