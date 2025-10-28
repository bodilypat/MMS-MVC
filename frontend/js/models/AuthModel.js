Frontend/js/models/authModel.js

import api from '../core/api.js';

class authModel {
    constructor() {
        this.user = null;
        this.token = localStorage.getItem('authToken') || null;
    }

    /* Login user and retrieve token + user dta 
       @param {Object} credenials - { email, pass } , @returns {Object} user data from API */ 
    
    async login(credentials) {
        try {
            const response = await api.post('/auth/login', credentials);

            if (response && response.token) {
                this.user = response.user;
                this.token = response.token;


                // persist session locally
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
            }
            return response;
        } catch (error) {
            console.error('AuthModel: Error logging in', error);
            throw error;
        }
    }
    /* Register a new user, @param {Object} useData - { name, email, password}, @return {Object} API response */
    async register(userData) {
        try {
            const response = await api.post('/auth/register', userData);
            return response;
        } catch (error) {
            console.error('AuthModel: Error registering user', error);
            throw error;
        }
    }

    /* Logout the current user, Clears local storage notifies the backend if needed */
    async logout() {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.warn('AuthModel: API logout failed, proceeding with client logout');
        } finally {
            this.user = null,
            this.token = null,
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
        }
    }

    /* Check if user is authenticated, @returns {boolean} */
    isAuthenticated() {
        return !!this.token;
    }

    /* Get currently logged-in user from local storage, @returns {Object|null} */
    getCurrentUser() {
        if (!this.user) {
            const storedUser = localStorage.getItem('user');
            this.user = storedUser ? JSON.parse(storedUser) : null;
        }
        return this.user;
    }

    /* Refresh token (optional - depends on backend API) */
    async refreshToken() {
        try {
            const response = await api.post('/auth/refresh', { token: this.token });
            if (response?.token) {
                this.token = response.token;
                localStorage.setItem('authToken', response.token);
            }
            return response;
        } catch (error) {
            console.error('AuthModel: Token refresh failed', error);
            throw error;
        }
    }
}

export default new authModel();
