// api/openai.js

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

        // ## MODIFICADO para OpenAI ##
        const openaiApiKey = process.env.OPENAI_API_KEY;

        if (!openaiApiKey) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'OpenAI API key not configured' }),
            };
        }

        // ## MODIFICADO para usar la URL de OpenAI ##
        const openaiApiUrl = 'https://api.openai.com/v1/chat/completions';

        // ## MODIFICADO para el formato de cuerpo de petición de OpenAI ##
        const openaiBody = {
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: prompt,
            }],
        };

        const response = await axios.post(openaiApiUrl, openaiBody, {
            headers: {
                'Content-Type': 'application/json',
                // ## MODIFICADO: Autenticación con Bearer Token para OpenAI ##
                'Authorization': `Bearer ${openaiApiKey}`
            }
        });
        
        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        const errorMessage = error.response && error.response.data && error.response.data.error ? error.response.data.error.message : 'An unexpected error occurred.';
        const errorStatus = error.response ? error.response.status : 500;
        
        return {
            statusCode: errorStatus,
            body: JSON.stringify({ message: errorMessage }),
        };
    }
};