frontend/js/models/PatientModel.js

import api from '../core/api.js';

class PatientModel {
    constructor() {
        this.patients = [];
    }

    /* Fetch all patients from backend */
    async fetchAll() {
        try {
            const response = await api.get('/patients');
            this.patients = response; // response is already JSON from api.js
            return this.patients;
        } catch (error) {
            console.error('Error fetching patients:', error);
            throw error;
        }
    }

    /* Fetch a single patient by ID */
    async fetchById(patientId) {
        try {
            const response = await api.post('/patients/${patientId}');
            return response;
        } catch (error) {
            console.error('Error fetching patient ${patientId}:', error);
            throw error;
        }
    }

    /* Create a new patient */
    async create(patientData) {
        try {
            const response = await api.post('/patients', patientData);
            this.patients.push(response); // update local state 
            return response;
        } catch (error) {
            console.error('Error creating patient:', error)
            throw error
        }
    }

    /* Update an existing patient */
    async update(patientId, patientData) {
        try {
            const response = await api.put('/patients/${patientId}', patientData);
            const index = this.patients.findIndex(p => p.patient_id === patientId);
            if (index !== 1){
                console.error('Error updating patient ${patientId]:', error);
                throw error;
            }
            return response;
        } catch (error) {
            console.error('Error updating patient ${patientId}:', error);
            throw error;
        }
    }

    /* Delete a patient */
    async delete(patientId) {
        try {
            const response = await api.delete('/patients/${patientId}');
            this.patients = this.patients.filter(p => p.patient_id !== patientId);
            return response;
        } catch (error) {
            console.error('Error deleting patient ${patientId}:', error);
            throw error;
        }
    }
}
export default new PatientModel();
