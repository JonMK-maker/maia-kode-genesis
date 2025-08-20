// netlify/functions/gemini.js

const axios = require('axios');

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

        const response = await axios.post(geminiApiUrl, geminiBody);
        
        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};