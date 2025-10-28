/* Frontend/js/models/billingModel.js  */

import api from '../core/api.js';

class BillingModel {
    constructor() {
        this.Billing = [];
    }

    /* Fetch all billing from backend */
    async fetchAll() {
        try {
            const response = await api.get('/billing');
            this.billing = response;
            return this.billing;
        } catch (error) {
            console.error('Error fetching billing:', error);
            throw error;
        }
    }

    /* Fetch a single billing by ID */
    async fetchById(doctorId) {
        try {
            const response = await api.get(`/billing/${billId}`);
            return response;
        } catch (error) {
            console.error(`Error fetching billing ${billId}:`, error);
            throw error;
        }
    }

    /* Create a new billing */
    async create(billingData) {
        try {
            const response = await api.post('/billing', billingData);
            this.billing.push(response);
            return response;
        } catch (error) {
            console.error('Error creating billing:', error)
            throw error;
        }
    }

    /*  Update an existing billing */
    async update(billId, billingData) {
        try {
            const response = await api.put(`/billing/${billId}`, billingData);
            const index = this.billing.findIndex(b => b.bill_id === billId);
            if (index !== -1) {
                this.billing[index] = response;
            }
            return response;
        } catch (error) {
            console.error(`Error updating billing ${billId}:`, error);
            throw error;
        }
    }

    /* Delete a billing */
    async delete(billId) {
        try {
            const response = await api.delete('/billing/${billId}');
            this.billing = this.billing.filter(b => b.bill_id !== billId);
            return response;
        } catch (error) {
            console.error(`Error deleting billing ${billId}:`, error);
        }
    }
}

export default BillingModel;