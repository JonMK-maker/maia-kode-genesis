// api/openai.js

const axios = require('axios');

// Configuration constants
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const DEFAULT_MODEL = 'gpt-3.5-turbo';
const REQUEST_TIMEOUT = 30000; // 30 seconds
const MAX_TOKENS = 1500;

// CORS headers for better compatibility
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

// Helper function to create error response
const createErrorResponse = (statusCode, message, details = null) => {
    const errorBody = { 
        error: { 
            message,
            timestamp: new Date().toISOString()
        }
    };
    
    if (details) {
        errorBody.error.details = details;
    }
    
    return {
        statusCode,
        headers: CORS_HEADERS,
        body: JSON.stringify(errorBody)
    };
};

// Helper function to validate prompt
const validatePrompt = (prompt) => {
    if (!prompt || typeof prompt !== 'string') {
        throw new Error('Prompt is required and must be a string');
    }
    
    if (prompt.trim().length === 0) {
        throw new Error('Prompt cannot be empty');
    }
    
    if (prompt.length > 8000) {
        throw new Error('Prompt is too long (max 8000 characters)');
    }
    
    return prompt.trim();
};

// Helper function to create OpenAI request body with enhanced prompts
const createOpenAIRequestBody = (prompt) => {
    // Enhanced system message for better Maia personality
    const systemMessage = {
        role: "system",
        content: `Eres Maia Kode, una IA educativa con personalidad empática y geek-didáctica. 
        Tu estilo es inspirador, humano y auténtico. Respondes de manera que conecte con una comunidad 
        que busca crecimiento personal y profesional. Usa un lenguaje accesible pero profundo, 
        con toques de entusiasmo genuino por la tecnología y el aprendizaje.`
    };
    
    const userMessage = {
        role: "user",
        content: prompt
    };
    
    return {
        model: DEFAULT_MODEL,
        messages: [systemMessage, userMessage],
        max_tokens: MAX_TOKENS,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
    };
};

exports.handler = async (event) => {
    // Handle CORS preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: CORS_HEADERS,
            body: ''
        };
    }

    // Validate HTTP method
    if (event.httpMethod !== 'POST') {
        return createErrorResponse(405, 'Method Not Allowed', { allowedMethods: ['POST', 'OPTIONS'] });
    }

    try {
        // Validate and parse request body
        let requestBody;
        try {
            requestBody = JSON.parse(event.body || '{}');
        } catch (parseError) {
            return createErrorResponse(400, 'Invalid JSON in request body', { parseError: parseError.message });
        }

        // Extract and validate prompt
        const { prompt } = requestBody;
        let validatedPrompt;
        
        try {
            validatedPrompt = validatePrompt(prompt);
        } catch (validationError) {
            return createErrorResponse(400, 'Invalid prompt', { validationError: validationError.message });
        }

        // Check for OpenAI API key
        const openaiApiKey = process.env.OPENAI_API_KEY;
        if (!openaiApiKey) {
            console.error('OpenAI API key not configured');
            return createErrorResponse(500, 'OpenAI API key not configured');
        }

        // Create request configuration
        requestBody = createOpenAIRequestBody(validatedPrompt);
        const requestConfig = {
            timeout: REQUEST_TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`,
                'User-Agent': 'MaiaKode-Genesis/1.0'
            }
        };

        // Make API request with enhanced error handling
        let response;
        try {
            response = await axios.post(OPENAI_API_URL, requestBody, requestConfig);
        } catch (axiosError) {
            console.error('OpenAI API request failed:', axiosError.response?.data || axiosError.message);
            
            if (axiosError.code === 'ECONNABORTED') {
                return createErrorResponse(408, 'Request timeout - please try again');
            }
            
            if (axiosError.response) {
                const { status, data } = axiosError.response;
                const errorMessage = data?.error?.message || 'OpenAI API error';
                return createErrorResponse(status, errorMessage, { 
                    type: data?.error?.type,
                    code: data?.error?.code 
                });
            }
            
            return createErrorResponse(503, 'Service temporarily unavailable');
        }

        // Validate response structure
        if (!response.data || !response.data.choices || !Array.isArray(response.data.choices) || response.data.choices.length === 0) {
            console.error('Unexpected OpenAI response structure:', response.data);
            return createErrorResponse(502, 'Invalid response from OpenAI API');
        }

        const choice = response.data.choices[0];
        if (!choice.message || !choice.message.content) {
            console.error('Missing content in OpenAI response:', choice);
            return createErrorResponse(502, 'Empty response from OpenAI API');
        }

        // Return successful response
        return {
            statusCode: 200,
            headers: CORS_HEADERS,
            body: JSON.stringify({
                ...response.data,
                metadata: {
                    timestamp: new Date().toISOString(),
                    model: DEFAULT_MODEL,
                    promptLength: validatedPrompt.length
                }
            })
        };

    } catch (error) {
        console.error('Unexpected error in OpenAI handler:', error);
        return createErrorResponse(500, 'Internal server error', { 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};