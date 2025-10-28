/* Frontend/js/controllers/BillingController.js */

import api from '../core/api.js';

class BillingController {
    /* Fetch all Billings */
    static async getAllBillings() {
        try {
            const response = await api.get('/billings');
            return response;
        } catch (error) {
            console.error('Error fetching bills:', error);
            throw error;
        }
    }

    /* Fetch a single billing by ID */
    static async getBillingById(billId) {
        try {
            const response = await api.get(`/billings/${billId}`);
            return response;
        } catch (error) {
            console.error(`Error fetching billing ${billId}:`, error);
            throw error;
        }
    }

    /* Create a new billing */
    static async createBilling(billData) {
        try {
            const response = await api.post('/billing', billData);
            return response; 
        } catch (error) {
            console.error('Error creating Billing:', error);
            throw error;
        }
    }

    /* Update an existing biling */
    static async updateBilling(billId, billData) {
        try {
            const response = await api.put(`/billing/${billId}`,billData);
            return response;
        } catch (error) {
            console.error(`Error updating billing ${billId}:`, error);
            throw error;
        }
    }

    /* Delete a billing */
    static async deleteBilling(billId) {
        try {
            const response = await api.delete(`/billing/${billId}`);
            return response;
        } catch (error) {
            console.error(`Error deleting billing ${billId}:`, error)
        }
    }
}

export default BillingController;
