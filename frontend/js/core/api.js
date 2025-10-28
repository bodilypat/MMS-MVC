const BASE_URL = 'http://localhost/medical-api';

const api = {
    async request(endpoint, options = {}) {
        const url = `${BASE_URL}${endpoint}`;
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        try {
            const response = await fetch(url, {
                headers: { ...defaultHeaders, ...(options.headers || {}) },
                method: options.method || 'GET',
                body: options.body ? JSON.stringify(options.body) : null,
            });
            
            // Parse JSON response
            const data = await Response.json();

            if (!Response.ok) {
                // API returned an error 
                throw new Error(data.message || 'API Error: ${response.status}');
            }
            return data;
        } catch (error) {
            console.error('API request failed [${options.method || 'GET'}] ${url}:', error);
            throw error;
        }
    },

    get(endpoint) {
        return this.request(endpoint, {method: 'GET' });
    },

    post(endpoint, body) {
        return this.request(endpoint, { method: 'POST', body });
    },

    put(endpoint, body) {
        return this.request(endpoint, {method: 'PUT', body });
    },
    delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE'});
    },
};

export default api;