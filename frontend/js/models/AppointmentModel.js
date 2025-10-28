/* Frontend/js/models/DoctorModel.js */

import api from '../core/api.js';

class AppointmentModel {
    constructor () {
        this.doctors = [];
    }

    /* Fetch all Appoitment list from backend */
    async fetchAll() {
        try {
            const response = await api.get('/appointments');
            this.appointments = response;
            return this.appointments;
        } catch (error) {
            console.error('Error fetching appontments:', error);
            throw error;
        }
    }

    /* Fetch a single appointment by ID */
    async fetchById(appointmentId) {
        try {
            const response = await api.get(`/appointments/${appointmentId}`);
            return response;
        } catch (error) {
            console.error(`Error fetching appointment ${appointmentId}:`, error);
            throw error;
        }
    }

    /* Create a new appointment */
    async create(appointmentData) {
        try {
            const response = await api.post('/appointments', appointmentData);
            this.appointments.push(response);
            return response;
        } catch (error) {
            console.error('Error creating appointment:', error);
            throw error;
        }
    }

    /* Update an existing apppointment */
    async update(appointmentId, appointmentData) {
        try {
            const response = await api.put(`/appointments/${appointmentId}`, appointmentData);
            const index= this.appointments.findIndex(a => a.appointment_id === appointmentId);
            if (index !== -1) {
                this.appointments[index] = response;
            }
            return response;
        } catch (error) {
            console.error(`Error updating appointment ${appointmentId}:`, error);
            throw error;
        }
    }

    /* Delete a appointment */
    async delete(appointmentId) {
        try {
            const response= await api.delete(`/appointments/${appointmentId}`);
            this.patients = this.appointments.filter(a => a.appontment_id === appointmentId)
            return response;
        } catch (error) {
            console.error(`Error deleting appointment ${appointmentId}:`, error);
            throw error;
        }
    }
}

export default AppointmentModel;
