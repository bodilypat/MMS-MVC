// Frontend/js/models/PatientModel.js

import api from '../core/api.js';

class PatientModel {
    constructor() {
        this.patients = [];
    }

    /* Fetch all patients from backend */
    async fetchAll() {
        try {
            const response = await api.get('/patients');
            this.ptients = response;
        } catch (error) {
            console.error('Error fetching patients:', error);
            throw error;
        }
    }

    /* Fetch a single patient by ID */
    async fetchById(patientId) {
        try {
            /* Use get (not POST) and template literals */
            const response = await api.get(`/patients/${patientId}`);
            return response;
        } catch (error) {
            console.error(`Error fetching patient ${patientId}`, error);
            throw error;
        }
    }

    /* Create a new patient */
    async create(patientData) {
        try {
            const response = await api.post('/patients', patientData);

            /* Update localp cache if succesfull */
            if (response && response.patient_id) {
                this.patients.push(response);
            }
            
            return response;
        } catch (error) {
            console.error('Error creating patient:', error);
            throw error;
        }
    }

    /* Update an existing pateint */
    async update(patientId, patientData) {
        try {
            const response = await api.put(`/patients/${patientId}`, patientData);

            /* Find index correctory */
            const index = this.patients.findIndex(p => p.patient_id == patientId);

            if (index !== -1) {
                /* Update cached patient*/
                this.patients[index ] = { ...this.patients[index], ...patientData };
            }

            return response; 
        } catch (error) {
            console.error(`Error updating patient ${patientId}:`, error)
            throw error;
        }
    }

    /* Delete a patient */
    async delete(patientId) {
        try {
            const response = await api.delete(`/patients/${patientId}`);

            /* Update local cache */
            this.patients = this.patients.filter(p => p.patient_id != patientId);

            return response;
        } catch (error) {
            console.error(`Error deleting patient ${patientId}:`, error);
        }
    }
}

// Export a single singleton instance 
export default new PatientModel();

