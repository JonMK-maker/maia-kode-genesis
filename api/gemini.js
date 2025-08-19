// netlify/functions/gemini.js

const fetch = require('node-fetch');

exports.handler = async (event) => {
    // 1. Manejo de errores y método de petición
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        // 2. Obtiene el prompt del cuerpo de la petición. El cuerpo viene como texto.
        const { prompt } = JSON.parse(event.body);

        // 3. Verifica la clave de la API. Esta se obtiene de las variables de entorno de Netlify.
        const geminiApiKey = process.env.GEMINI_API_KEY;

        if (!geminiApiKey) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'API key not configured' }),
            };
        }

        // 4. Construye la URL de la API de Gemini con la clave
        const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`;

        // 5. Adapta la petición al formato que espera la API de Gemini
        const geminiBody = {
            contents: [{
                parts: [{
                    text: prompt,
                }],
            }],
        };

        // 6. Realiza la petición a la API de Gemini
        const response = await fetch(geminiApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(geminiBody),
        });

        // 7. Envía la respuesta de la API de Gemini de vuelta al frontend
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