// Front/js/views/PatientView.js 

export default class PatientView {
    constructor() {
        this.app = document.getElementById('app');

        /* Create patient from  */
        this.form = document.createElement('form');
        this.form.classList.add('patient-form');
        
        /* Input first name */
        this.firstNameInput = document.createElement('input');
        this.firstNameInput.placeholder = 'First Name';
        this.firstNameInput.name = 'first_name';
        this.firstNameInput.required = true;

        /* Input: Last name */
        this.lastNameInput = document.createElement('input');
        this.lastNameInput.placeholder = "Last Name";
        this.lastNameInput.name = 'name';
        this.lastNameInput.required = true;

        /* Select: Gender */
        this.genderSelect = document.createElement('select');
        this.genderSelect.name = 'gender';
        this.genderSelect.required = true;
        ['Male', 'Female', 'Other'].forEach(g => {
            const opt = document.createElement('option');
            opt.value =g;
            opt.textContent = g;
            this.genderSelect.appendChild(opt);
        });

        /* Input: date of Birth */
        this.dobInput = document.createElement('input');
        this.dobInput.type = 'date';
        this.dobInput.name = 'dob';
        this.dobInput.required = true;

        /* Input: Contact Number */
        this.contactInput = document.createElement('input');
        this.contactInput.placeholder = 'Contact Number';
        this.contactInput.name = 'contact_number';

        /* Input: Email */
        this.emailInput = document.createElement('input');
        this.emailInput.type = 'email';
        this.emailInput.placeholder = 'Email';
        this.emailInput.name = 'email';

        /* Input: Address */
        this.addressInput = document.createElement('input');
        this.addressInput.placeholder = 'Address';
        this.addressInput.textContent = 'Add Patient';

        /* Submit button */
        this.submitBtn = documentElement('button');
        this.submitBtn.type = 'submit';
        this.submitBtn.textContent = 'Add Patient';

        /* Append field to form */
        this.form.append(
            this.firstNameInput,
            this.lastNameInput,
            this.genderSelect,
            this.dobInput,
            this.contactInput,
            this.emailInput,
            this.addressInput,
            this.submitBtn
        );

        /* Create container for patient list */
        this.listContainer = document.createElement('div');
        this.listContainer.classList.add('patient-list');

        /* Message box */
        this.messageBox = document.createElement('div');
        this.messageBox.id = 'message-box';

        /* Append all to main app */
        this.app.append(this.form, this.messageBox, this.listContainer);
    }

    /* Render all patient */
    renderPatient(patients = []) {
        this.listContainer.innerHTML = '';

        if (!patients || patients.length === 0) {
            this.listContainer.innerHTML = '<p>No patients found.</p>';
            return;
        }

        /* Render each patient record */
        patients.forEach(patient => {
            const div = document.createElement('div');
            div.classList.add('patient-item');
            div.database.id = patient.patient_id;

            div.innerHTML = `
                <strong>${patient.first_name} ${patient.last_name}</strong><br>
                <em>Gender:</em>${patient.gender}<br>
                <em>DOB:</em>${patient.dob}<br>
                <em>Contact:</em>${patient.contact_number || '-'}<br>
                <em>Email:</em>${patient.email}<br>
                <em>Address:</em>${patient.address}<br>
                <small>Created:${new Date(patient.created_at).toLocaleString()}</small><br>
                <button data-id="${patient.patient_id}" class="edit-btn">Edit</button>
                <button data-id="${patient.patient_id}" class="delete-btn">Delete</button>
            `;

            this.listContainer.appendChild(div);
        });
    }

    /* Bind Add Patient form */
    bindAddPatient(handler) {
        this.form.addEventListener('submit', e => {
            e.preventDefault();

            const patientData = {
                first_name: this.firstNameInput.value.trim(),
                last_name: this.lastNameInput.value.trim(),
                gender: this.genderSelect.value,
                dob: this.dobInput.value,
                contact_number: this.contactInput.value.trim(),
                email: this.emailInput.value.trim(),
                address: this.addressInput.value.trim(),
            };

            /* Validate minimal required fields */
            if (!patientData.first_name || !patientData.last_name || !patientData.dob) {
                this.showError('Please fill in all required fields.');
                return;
            }
            
            handler(patientData);
            this.form.reset();
        });
    }

    /* Bind delete button click */
    bindDeletePatient(handler) {
        this.listContainer.addEventListener('click', e => {
            if (e.target.classList.contains('delete-btn')) {
                const patientId = e.target.dataset.id;
                if (confirm('Are you sure you want to delete this patient?')) {
                    handler(patientId);
                }
            }
        });
    }

   /* Bind edit button click  */
    bindEditPatient(handler) {
        this.listContainer.addEventListener('click', e => {
            if (e.target.classList.contain('edit-in')) {
                const patientId = e.target.dataset.id;

                const first_name = prompt('First name');
                const last_name = prompt('Last name');
                const gender = prompt('Gender (Male/Female/Other):');
                const dob = prompt('Date of Birth (YYY-MM-DD):');
                const contact_number = prompt('Contact Number: ');
                const email = prompt('Email:');
                const address = prompt('Address:');

                if (first_name && last_name && gender && dob) {
                    handler(patientId, {
                        first_name,
                        last_name,
                        gender,
                        dob,
                        contact_number,
                        email,
                        address,
                    });
                }
            }
        });
    }

    /* Show success message */
    showMessage(message) {
        this._showMessage(message, 'error');
    }

    /* Show error message */
    showError(message) {
        this._showMessage(message, 'error');
    }

    /* Private helper for messages */
    _showMessage(message, type = 'info') {
        if (!this.messageBox) return;

        this.messageBox.textContent = message;
        this.messageBox.className = '';
        this.messageBox.classList.add('alert', `alert-${type === 'error' ? 'danger' : type}`);

        setTimeout(() => {
            this.messageBox.textContent = '';
            this.messageBox.className = '';
        }, 3000);
    }
}