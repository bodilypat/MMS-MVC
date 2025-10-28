/* Frontend/js/controllers/AuthController.js */ 

import api from '../core/api.js';
import AuthModel from '../models/AuthModel.js';
import Nofication from '../components/Notification.js';
import Router from '../core/router.js';

class AuthController {
    /* Handler user login @param {Object} credentials - { email, password } */
    static async login(credentials) {
        try {
            const userData = await AuthModel.login(credentials);
            // save token in local storage 
            localStorage.setItem('authToken', userData.token);
            localStorage.setItem('user', JSON.stringify(userData.user));

            Nofication.show('Login successful! Redirecting...', 'success');

            // Redirect to dashboard after successful login 
            Router.navigate('/');
        } catch (error) {
            Nofication.show(error.message || 'Invalid email or password', 'error');
            console.error('Login failed:', error);
        }
    }

    /* Handle user registration (if application), @param {Object} userData - registration data */
    static async register(userData) {
        try {
            const response = await AuthModel.register(userData);
            Nofication.show('Registration successful! you can now log in.', 'success');
            Router.navigate('/login');
            return response;
        } catch (error) {
            Nofication.show(error.message || 'Registration failed', 'error');
            console.error('Regitration failed:', error);
        }
    }
    /* Check if user is authenticated, @returns {boolean} */
    static isAuthenticated() {
        const token = localStorage.getItem('authToken');
        return !!token;
    }

    /* Get current authenticated user, @return { Object|null} */
    static getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    /* Logout user and clear session */
    static logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');

        Notification.show('Logged out successfully.', 'info');
        Router.navigate('/login');
    }
}

export default AuthController;