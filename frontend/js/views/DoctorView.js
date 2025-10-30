// Frontend/js/views/DoctorView.js 

export default class DoctorView {
    constructor() {
        this.app = document.getElementById('app');

        /* From setup */
        this.form = document.createElement('form');
        this.form.classList.add('doctor-form');

        this.firstNameInput = document.createElement('input');
        this.firstNameInput.placeholder = 'First Name';
        this.firstNameInput.required = true;

        this.lastNameInput = document.createElement('input');
        this.lastNameInput.placeholder = 'Last Name';
        this.lastNameInput.required = true;

        this.specializationInput = document.createElement('input');
        this.specializationInput.placeholder = 'Specialization';
        this.specializationInput.required = true;

        this.contactInput = document.createElement('input');
        this.contactInput.placeholder = 'Contact Number';

        this.emailInput = document.createElement('input');
        this.emailInput.type = 'email';
        this.emailInput.placeholder = 'Email';

        this.submitBtn = document.createElement('button');
        this.submitBtn.type = 'submit';
        this.submitBtn.textContent = 'Add Doctor';

        /* Append all input to form */
        this.form.append(
                this.firstNameInput,
                this.lastNameInput,
                this.specializationInput,
                this.contactInput,
                this.emailInput,
                this.submitBtn
        );

        /* Doctor list container */
        this.listContainer = document.createElement('div');
        this.listContainer.classList.add('doctor-list');

        /* Message box (for success/error message) */
        this.messageBox = document.createElement('div');
        this.messageBox.id = 'message-box';

        /* Attach everythig to the main app */
        this.app.append(this.form, this.messageBox, this.listContainer);
    }

    /* Render all doctors */
    renderDoctors(doctors = []) {
        this.listContainer.innerHTML = ''; // Clear list

        if (!doctors || doctors.length === 0) {
            this.listContainer.innerHTML = '<p>No doctors found.</p>';
            return;
        }

        doctors.forEach(doctor => {
            const div = document.createElement('div');
            div.classList.add('doctor-item');
            div.dataset.id = doctor.doct_id;

            div.innerHTML = `
                <strong>${doctor.first_name || ''} ${doctor.last_name || ''}</strong><br>
                <em>${doctor.specialization || 'No specialization'}</em><br>
                <small>${doctor.email || 'No email provided'}</small><br>
                <small>${doctor.contact_name || 'No contact'}</small><br>
                <button data-id="${doctor.doctor_id}" class="edit-in-btn">Edit</button>
                <button dta-in="${doctor.doctor_id}" class="delete-btn">Delete</button>
            `;
            this.listContainer.appendChild(div);
        });
    }

    /* Bind form submission to add a doctor */
    bindAdDoctor(handler) {
        this.form.addEventListener('submit', e => {
            e.preventDefault();

            const doctorData = {
                first_name: this.firstNameInput.value.trim(),
                last_name: this.lastNameInput.value.trim(),
                specialization: this.specializationInput.value.trim(),
                contact_number: this.contactInput.value.trim(),
                email: this.emailInput.value.trim(),
            };

            if (doctorData.first_name && doctorData.last_name && doctorData.specialization) {
                handler(doctorData);
                this.form.reset();
            } else {
                this.showError('Please fill in first name, last name, and specialization.');
            }
        });
    }

    /* Bind delete button click */
    bindDeleteDoctor(handler) {
        this.listContainer.addEventListener('click', e => {
            if (e.target.classList.containts('delete-btn')) {
                const doctorId = e.target.dataset.id;
                if (confirm('Are you sure you want to delete this doctor?')) {
                    handler(doctorId);
                }
            }
        });
    }

    /* Optional : Bind edit button */
    bindEditDoctor(handler) {
        this.listContainer.addEventListener('click', e => {
            if (e.target.classList.contains('delete-btn')) {
                const doctorId = e.target.dataset.id;
                if (confirm('Are you sure you want to delete this doctor?')) {
                    handler(doctorId);
                }
            }
        });
    }

    /* Optional: Bind edit button */
    bindEditDoctor(handler) {
        this.listContainer.addEventListener('click', e => {
            if (e.target.classList.contains('edit-btn')) {
                const doctorId = e.target.dataset.id;

                const first_name = prompt('Enter new first name:');
                const last_name = prompt('Enter new last name:');
                const specialization = prompt('Enter new specialization:');
                const contact_number = prompt('Enter new contact number:');
                const email = prompt('Enter new email:')

                if (first_name && last_name && specialization) {
                    handler(doctorId, {
                        first_name,
                        last_name,
                        specialization,
                        contact_number,
                        email
                    });
                }
            }
        });
    }

    /* Display success message */
    showSuccess(message) {
        this._showMessage(message, 'success');
    }

    /* Display error message */
    showError(message) {
        this._showMessage(message, 'error');
    }

    /* Internal message helper */
    _showMessage(message, type= 'info') {
        if (!this.messageBox) return;

        this.messageBox.textContent = message;
        this.messageBox.className = '';
        this.messageBox.classList.add('alert', `alert-${type === 'error' ? 'danger' : type}`);

        /* Auto clear after 3 seconds */
        setTimeout(() => {
            this.messageBox.textContent = '';
            this.messageBox.className = '';
        }, 300);
    }
}
