/* Frontend/js/models/DoctorModel.js */

import api from '../core/api.js';

class DoctorModel {
    constructor() {
        this.doctors = [];
    }

    /* Fetch all doctors from backend */
    async fetchAll() {
        try {
            const response = await api.get('/doctors');
            this.doctors = response;
            return this.doctors;
        } catch (error) {
            console.error('Error fetching doctors:', error);
            throw error;
        }
    }

    /* Fetch a single patient by ID */
    async fetchById(doctorId) {
        try {
            const response = await api.get(`/doctors/${doctorId}`);
            return response;
        } catch (error) {
            console.error(`Error fetching doctor ${doctorId}:`, error);
            throw error;
        }
    }

    /* Create a new doctor */
    async create(doctorData) {
        try {
            const response = await api.post('/doctors', doctorData);
            this.doctors.push(response);
            return response;
        } catch (error) {
            console.error('Error creating doctor:', error);
            throw error;
        }
    }

    /* Update an existing doctor */
    async update(doctorId, doctorData) {
        try {
            const response = await api.put(`/doctors/${doctorId}`, doctorData);
            const index = this.doctors.findIndex(d => d.doctor_id === doctorId);
            if (index !== -1) { 
                this.doctors[index] = response;
            }
            return response;
        } catch (error) {
            console.error('Error updating doctor ${doctorId}:', error);
            throw errow;
        }
    }

    /* Delete a doctor */
    async delete(doctorId) {
        try {
            const response = await api.delete('/doctors/{doctorID}');
            this.doctors = this.doctors.filter(d =>d.doctor_id !== doctorId);
            return response;
        } catch (error) {
            console.error(`Error deleting doctor ${doctorId}:`, error);
            throw error;
        }
    }
}

export default new DoctorModel();

