// Frontend/js/core/api.js

const BASE_URL = 'http://localhost/rest-api/public';

const headers = { 'Content-type':'application/json'};

export default {
    async get(endpoint) {
        const res = await fetch(`{BASE_URL}${endpoint}`);
        if (!res.ok) throw new error(`GET ${endpoint} failed`);
        return res.json();
    },

    async post(endpoint, data) {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        })
        if (!res.ok) throw new Error(`POST ${endpoint} failed`);
        return res.json();
    };

    async put(endpoint, data) {
        const res = await fetch(`{BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new error(`PUT ${endpoint} failed`);
        return res.json();
    },

    async delete(endpoint) {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`PUT ${endpoint} failed`);
        return res.json()
    },

    async delete(endpoint) {
        const res = await fetch(`${BASE_URL}${endpoint}`, {method: 'DELETE' });
        if (!res.ok) throw new Error(`DELETE ${endpoint} failed`);
        return res.json();
    }
};

