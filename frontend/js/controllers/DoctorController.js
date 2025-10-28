/* Frontend/js/controller/DoctorController.js */

import api from '../core/api.js';

class DoctorController {
    /* Fetch all Doctors */
    static async getAllDoctors() {
        try {
            const response = await api.get('/doctors'); // corrected endpoint
            return response;
        } catch (error) {
            console.error('Error fetching Doctors:', error);
            throw error;
        }
    }

    /* Fetch a single doctor by ID */
    static async getDoctorById(doctorId) {
        try {
            const response = await api.get(`/doctors/${doctorId}`); 
            return response;
        } catch (error) {
            console.error(`Error fetching doctor ${doctorId}:`, error);
            throw error;
        }
    }

    /* Create a new patient */
    static async createDoctor(doctorData) {
        try {
            const response = await api.post(`/doctors`, doctorData)
            return response;
        } catch (error) {
            console.error(`Error creating doctor:`, error);
            throw error;
        }
    }

    /* Update an existing patient */
    static async updateDoctor(doctorId, doctorData) {
        try {
            const response = await api.put(`/doctors/${doctorId}`, doctorData);
            return response;
        } catch (error) {
            console.error(`Error updating patient ${doctorId}:`);
            throw error;
        }
    }

    /* Delete a patient */
    static async deletePatient(doctorId) {
        try {
            const response = await api.delete(`/patients/${patientId}`);
            return response;
        } catch (error) {
            console.error(`Error delete doctor ${doctorId}:`, error);
            throw error;
        }
    }
}