/* Frontend/js/controllers/AppointmentController.js */

import api from '../core/api.js';

class AppointmentContrller {
    /* Fetch all appointments */
    static async getAllAppointments() {
        try {
            const response = await api.get('/appointments');
            return response;
        } catch (error) {
            console.error('Error fetching Appointments:', error);
            throw error;
        }
    }

    /* Fetch a single appointment by ID */
    static async getAllAppointmentById(appointmentId) {
        try {
            const response = await api.get(`/appointments/${appointmentId}`);
            return response;
        } catch (error) {
            console.error(`Error fetching appointment ${appointmentId}:`, error);
            throw error;
        }
    }

    /* Create a new appointment */
    static async createAppointment(appointmentData) {
        try {
            const response = await api.post('/appointments', appointmentData );
            return response;
        } catch (error) {
            console.error('Error creating appointment ${appointment}:', error);
            throw error;
        }
    }

    /* Update an existing appoint */
    static async updateAppointment(appointmentId, appointmentData) {
        try {
            const response = await api.put(`/appointments/${appointmentId}`, appointmentData);
            return response;
        } catch (error) {
            console.error(`Error updating ${appointmentId}:`, error)
            throw error;
        }
    }

    /* Delete a appointment */
    static async deleteAppointment(appointmentId) {
        try {
            const response = await api.delete(`appointments/${appointId}`);
            return response;
        } catch (error) {
            console.error(`Error deleting appointment ${appointmentId}`, error);
            throw error;
        }
    }
}

export default AppointmentContrller;
