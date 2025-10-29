// Frontend/js/models/PatientModel.js 

class PatientModel {
    constructor() {
        this.patients = [];
    }

    /* Fatch all patients from backend */
    async fetch() {
        try {
            const response = await api.get('/patients');
            this.patients = response;
            return this.patients;
        } catch (error) {
            console.error('Error fetching patients:', error);
            throw error;
        }
    }

    /* Fetch a single patient by ID */
    async fetchById(patientId) {
        try {
            const response = await api.get(`/patients/${patientId}`);
            return response;
        } catch (error) {
            console.error(`Error fetching patient ${patientId}:`, error);
            throw error;
        }
    }

    /* Create a new patient */
    async create(patientData) {
        try {
            const response = await api.post('/patients', patientData);

            if (response && response.patient_id) {
                this.patients.push(response);
            }
            return response;
        } catch (error) {
            console.error('Error creating patient:', error);
            throw error;
        }
    }

    /* Update an existing patient */
    async update(patientId, patientData) {
        try {
            const response = await api.put(`/patients/${patientId}`, patientData);

            const index = this.patients.findIndex(p => p.patient_id == patientId);

            if (index !== -1) {
                this.patients[index] = { ...this.patients[index], ...response };
            }
            return response;
        } catch (error) {
            console.error(`Error updating patient ${patientId}:`, error);
            throw error;
        }
    }

    /* Delete a patient */
    async delete(patientId) {
        try {
            const response = await api.delete(`/patients/${patientId}`);

            this.patients = this.patients.filter(p => p.patientId != patientId);

            return response;
        } catch (error) {
            console.error(`Error deleting patient ${patientId}`, error);
            throw error;
        }
    }
}

export default new PatientModel();