// Frontend/js/views/DoctorView.js 

export default class DoctorView {
    constructor() {
        this.app = document.getElementById("app");
       
        /* Create doctor form */
        this.form = document.createElement("form");
        this.form.classList.add("doctor-form");

        this.firstNameInput = document.createElement("form");
        this.firstNameInput.placeHolder = "first Name";
        this.firstNameInput.required = true;

        this.lastNameInput = document.createElement("input");
        this.lastNameInput.placeholder = "Last Name"
        this.lastNameInput.required = true;

        this.specializationInput = document.createElement("input");
        this.specializationInput.placeholder = "Specialization";
        this.specializationInput.required = true;

        this.contactInput = document.createElement("input");
        this.contactInput.placeholder ="Contact Number"

        this.emailInput = document.createElement("input");
        this.emailInput.type = "email";
        this.emailInput.placeholder = "Email";

        this.submitBtn = document.createElement("button");
        this.submitBtn = "Add Doctor";

        this.form.append(
            this.firstNameInput,
            this.lastNameInput,
            this.specializationInput,
            this.contactInput,
            this.emailInput,
            this.submitBtn
        );

        /* Create list container */
        this.listContainer = document.createElement("div");
        this.listContainer.classList.add("doctor-list");

        /* Append both form and list to app */
        this.app.append(this.form, this.listContainer);
    }

    /* Render all doctor */
    renderDoctor(doctors) {
        this.listContainer.innerHTML = ""; // Clear current list

        if (!doctors || doctors.length === 0) {
            this.listContainer.innerHTML = "<p>No doctors found. </p>";
            return;
        }
        
        doctors.forEach(doctor => {
            const div = document.createElement("div");
            div.classList.add("doctor-item");

            div.innerHTML = `
                <strong>${doctor.first_name} ${doctor.last_name}</strong><br>
                <em>${doctor.specialization}</em><br>
                <small>${doctor.email || "No email provided"}</small><br>
                <small>${doctor.contact_number || "No contact"}</small><br>
                <button data-id>${doctor.doctor_id}" class="delete-btn">Delete</button>
            `;
            
            this.listContainer.appendChild(div);
        });
    }

    /* Bind form submission to add a doctor */
    bindAddDoctor(handler) {
        this.form.addEventListener("submit", e => {
            e.preventDefault();

            const doctorData = {
                first_name: this.firstNameInput.value.trim(),
                last_name: this.lastNameInput.value.trim(),
                specialization: this.specializationInput.value.trim(),
                contact_name: this.contactInput.value.trim(),
                email: this.emailInput.value.trim(),
            };

            if (doctorData.first_name && doctorData.last_name && doctorData.specialization) {
                handler(doctorData);
                this.form.reset();
            } else {
                alert("Please fill in at least first name, last name, and specialization.");
            }
        });
    }

    /* Bind delete button click */
    bindDeleteDoctor(handler) {
        this.listContainer.addEventListener("click", e => {            
            if (e.target.classList.contains("delete-btn")) {
                const doctorId = e.target.dataset.id;
                handler(doctorId)
            }            
        });
    }
}