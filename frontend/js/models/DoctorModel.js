//Frontend/js/models/DoctorModel.js 

import api from '../core/api.js';

class DoctorModel {
    constructor() {
        this.doctors = [];
    }

    /* Fetch all Doctor from backend */
    async fetAll() {
        try {
            const response = await api.get('/doctors');
            this.patients = response; 
            return this.doctors;
        } catch (error) {
            console.error('Error fetching doctors:', error);
            throw error;
        }
    }

    /* Fetch a single doctor by ID */
    async fetchById(doctorId) {
        try {
            /* Use GET and template literals */
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

            /* Update local cache if successful  */
            if (response && response.doctor_id) {
                this.doctors.push(response);
            }
            
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

            /* Find index correctory */
            const index = this.doctors.findIndex(d => d.doctor_id == doctorId);
            if (index !== -1) {
                /* Update cached doctor */
                this.doctors[index] = { ...this.doctors[index], ...doctorData };
            }
            
            return response;
        } catch (error) {
            console.error(`Error updating doctor ${doctorId}:`, error);
            throw error;
        }
    }

    /* Delete a doctor */
    async delete(patientId) {
        try {
            const response = await api.delete(`/doctors/${doctorId}`);

            /* Update local cache */
            this.doctors = this.doctors.filter(d => d.doctor_id != doctorId);

            return response;
        } catch (error) {
            console.error(`Error deleting doctor ${doctorId}:`, error);
            throw error
        }
    }
}

// Export a singleton instance
export default new DoctorModel();

