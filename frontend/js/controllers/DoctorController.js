// Frontend/js/controllers/PatientController.js 

import PatientModel from './models/DoctorModel.js';
import PatientView from './views/DoctorView.js';

class DoctorController {
    constructor() {
        this.model = PatientModel;
        this.view = new DoctorView();

        /* Initial render */
        this.init();
    }

    async init() {
        try {
            const doctors = await this.model.fetchAll();
            this.view.rederDoctor(doctors);

            /* Bind event handlers currectly */
            this.view.bindAddDoctor(this.handleAddDoctor.bind(this));
            this.view.bindDeleteDoctor(this.handleDeleteDoctor.bind(this));
            this.view.bindEditDoctor(this.handleEditDoctor.bind(this));
        } catch (error) {
            console.error('Initialization failed:', error);
            this.view.showError('Failed to load doctors. Please try again.');
        }
    }

    /* Handle adding a doctor */
    async handleAddDoctor(doctorData) {
        try {
            await this.model.create(doctorData);
            const doctors = await this.model.fetchAll();
            this.view.renderDoctors(doctors);
            this.view.showSuccess('Doctor added successfully.');
        } catch (error) {
            console.error('Error adding doctor:', error);
            this.view.showError('could not add patient. please try again.');
        }
    }

    /* Handle deleting a doctor */
    async handleDeleteDoctor(doctorId) {
        try {
            await this.model.delete(doctorId);
            const patients = await this.model.fetchAll();
            this.view.rederDoctors(patients);
            this.view.showSuccess('Doctor deleted successfully');
        } catch (error) {
            console.error('Error deleting doctor:', error);
            this.view.showError('Could not delete doctor. Please try again.')
        }
    }

    /* Handle  updating/editing a patient */
    async handleEditDoctor(doctorId, updateData) {
        try {
            await this.model.update(doctorId, updateData);
            const doctor = await this.model.fetchAll();
            this.view.renderDoctors(doctors);
            this.view.showSuccess('Patient update successfully.');
        } catch (error) {
            console.error('Error updating doctor:', error);
            this.view.showError('could not update doctor. Place try again.')
        }
    }
}

export default DoctorController;
