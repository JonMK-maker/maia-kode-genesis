const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    console.log('🔧 Función Netlify ejecutándose');
    console.log('Método:', event.httpMethod);
    console.log('Headers:', JSON.stringify(event.headers, null, 2));

    // Configurar CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Manejar requests OPTIONS (preflight)
    if (event.httpMethod === 'OPTIONS') {
        console.log('✅ Respondiendo a OPTIONS request');
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // Solo permitir POST
    if (event.httpMethod !== 'POST') {
        console.log('❌ Método no permitido:', event.httpMethod);
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    // Verificar API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.log('❌ API Key no configurada');
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'OpenAI API key not configured' })
        };
    }

    console.log('✅ API Key encontrada');

    try {
        // Parsear body
        const { prompt } = JSON.parse(event.body || '{}');
        
        if (!prompt) {
            console.log('❌ Prompt no proporcionado');
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Prompt is required' })
            };
        }

        console.log('📤 Enviando a OpenAI, prompt length:', prompt.length);

        // Llamar a OpenAI
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "user", content: prompt }
                ],
                max_tokens: 1000,
                temperature: 0.7
            })
        });

        const data = await response.json();
        console.log('📥 Respuesta de OpenAI:', response.status, response.ok);

        if (!response.ok) {
            console.log('❌ Error de OpenAI:', data);
            throw new Error(data.error?.message || 'OpenAI API error');
        }

        console.log('✅ Respuesta exitosa de OpenAI');
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
        };

    } catch (error) {
        console.error('❌ Error en función:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: {
                    message: error.message || 'Internal server error'
                }
            })
        };
    }
};