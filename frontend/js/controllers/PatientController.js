/* Frontend/js/controller/PatientController.js */

import api from '../core/api.js';

class PatientController {
    static async getAllPatient() {
        try {
            const response = await api.get('/patients'); // corrected endpoint   }
            return response;
        } catch (error) {
            console.error('Error fetching patients: ', error);
            throw error;
        }
    }

    /* Fetch a single patient by ID */
    static async getPatientById(patientId) {
        try {
            const response = await api.get('/patients/${patientId}'); // use backticks for template literal
            return response;
        } catch (error) {
            console.error('Error fetching patient ${patientId}:', error);
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
            const response = await api.put('/patients/{patientId}', patientData);
            return response;
        } catch (error) {
            console.error('Error updating patient ${patientId}:', error);
            throw error;
        }
    }

    /* Delete a patient */
    static async deletePatient(patientId) {
        try {
            const response = await api.delete('/patients/${patientId}');
            return response;
        } catch (error) {
            console.error('Error deleting patient ${paitentId}:', error);
            throw error;
        }
    }
}
export default PatientController;

