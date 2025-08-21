const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'OpenAI API key not configured' })
        };
    }

    try {
        const { text } = JSON.parse(event.body);
        
        if (!text) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Text is required' })
            };
        }

        const response = await fetch('https://api.openai.com/v1/audio/speech', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'tts-1',
                voice: 'nova',
                input: text.substring(0, 4000)
            })
        });

        if (!response.ok) {
            throw new Error('Failed to generate audio');
        }

        const audioBuffer = await response.buffer();

        return {
            statusCode: 200,
            headers: {
                ...headers,
                'Content-Type': 'audio/mpeg'
            },
            body: audioBuffer.toString('base64'),
            isBase64Encoded: true
        };

    } catch (error) {
        console.error('Audio generation error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: { message: error.message || 'Failed to generate audio' }
            })
        };
    }
};