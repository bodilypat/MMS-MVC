// Frontend/js/controllers/PatientController.js

import api from '../core/api.js';

class PatientController {
    /* Fetch all patients */
    static async getAllPatients() {
        try {
            const response = await api.get('/patients');
            return response;
        } catch (error) {
            console.error('Error fetching patients:', error);
            throw error;
        }
    }

    /* Fetch a single patient by ID */
    static async getAllPatientById(patientId) {
        try {
            /* Use backticks for template literals */
            const response = await api.get(`ptients/${patientId}`);
            return response;
        } catch (error) {
            console.error(`Error fetching patient ${patientId}:`, error);
            throw error;
        }
    }

    /* Create a new patient */
    static async createPatient(patientData) {
        try {
            const response = await api.post('/patients', patientData);
            return response;
        } catch (error) {
            console.error('Error creating patient:', error);
            throw error;
        }
    }

    /* Update an existing patient */
    static async updatePatient(patientId, patientData) {
        try {
            /* Corrected URL syntax */
            const response = await api.put(`/patients/${patientId}`, patientData);
            return response;
        } catch (error) {
            console.error(`Error updating patient ${patientId}`, error);
            throw response;
        } 
    }

    /* Delete a patient */
    static async deletePatient(patientId) {
        try {
            /* Corrected template literal and typo */
            const response = await api.delete(`/patients/${patientId}`);
            return response;
        } catch (error) {
            console.error(`Error deleting patient ${patientId}:`, error);
            throw error;
        }
    }
}

export default PatientController;

