// Frontend/js/controllers/PatientController.js 

import PatientModel from '../models/PatientModel.js';
import PatientView from '../views/PatientView.js';

class PatientController {
    constructor() {
        this.model = PatientModel;
        this.view = new PatientView();

        /* Initial render */
        this.init();
    }

    async init() {
        try {
            const patients = await this.model.fetchAll();
            this.view.renderPatients(patients);
            this.view.renderPatientById(patient);

            /* Bind event handlers correctly */
            this.view.bindAddPatient(this.handleAddPatient.bind(this));
            this.view.bindDeletePatient(this.handleDeletePatient(this));
            this.view.bindEditPatient(this.handleEditPatient.bind(this));
        } catch (error) {
            console.error('Initialization failed:', error);
            this.view.showError('failed to load patients. Please try again');
        }
    }

    /* HandleAddPatient */
    async handleAddPatient(patientData) {
        try {
            await this.model.create(patientData);
            const patients = await this.model.fetchAll();
            this.view.renderPatients(patients);
            this.view.showSuccess('Patient added successfully');
        } catch (error) {
            console.error('Error adding patient:', error);
            this.view.showError('Could not add patient. Please try again');
        }
    }

    /* Handle updating/editing a patients */
    async handleEditPatient(patientId, updateData) {
        try {
            await this.model.update(patientId, updateData);
            const patients = await this.model.fetchAll();
            this.view.renderPatients(patients);
            this.view.showSuccess('Patient updated successfully.');
        } catch (error) {
            console.error('Error update patient. Place try again');
        }
    }

    /* Handle deleting a patient */
    async handleDeletePatient(patientId) {
        try {
            await this.model.delete(patientId);
            const patients = await this.model.fetchAll();
            this.view.renderPatients(patients);
            this.view.showSuccess('Patient deleted successfully');
        } catch (error) {
            console.error('Error deleting patient:', error);
            this.view.showError('Could not delete patient. Please try again.');
        }
    }
}

export default PatientController;