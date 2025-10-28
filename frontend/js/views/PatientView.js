// Frontend/js/views/PatientView.js 

export default class PatientView {
    constructor() {
        this.app = document.getElementById("app");

        /* Create form */
        this.form = document.createElement("form");
        this.nameInput = document.createElement("Input");
        this.nameInput.ariaPlaceholder = "Full name";
        this.ageInput = document.createElement("input");
        this.ageInput.type = "number";
        this.ageInput.placeholder = "Age";
        this.submitBtn = document.createElement("button");
        this.submitBtn.textContent = "Add Patient";

        this.form.append(this.nameInput, this.ageInput, this.submitBtn);

        /* Create list */
        this.list = document.createElement("div");
        this.app.append(this.form, this.list);
    }

    /* Render all patient */
    renderPatient(patients) {
        this.list.innerHTML = "";

        if (!patients.lenght) {
            this.list.innerHTML ="<p>No patients found.</p>"
            return;
        }
        patients.forEach(patient => {
            const div = document.createElement("div");
            div.className = "patient";
            div.innerHTML = `
                <strong>${patient.name}</strong> (Age: ${patient.age})
                <button data-id= "${patient.patient_id}" class="delete-btn">Delete</button>
            `;
            this.list.appendChild(div);
        });
    }

    /* Bind form submission */
    bindAddPatient(handler) {
        this.form.addEventListener("submit", e => {
            e.preventDefault();
            const newPatient = {
                name: this.nameInput.value.trim(),
                age: parseInt(this.ageInput.value.trim(), 10)
            };
            if (newPatient.name && newPatient.age) {
                handler(newPatient);
                this.form.reset();
            }
        });
    }

    /* Bind delete button click */
    bindDeletePatient(header) {
        this.list.addEventListener("click", e => {
            if (e.target.classList.contains("delete-btn")) {
                const id = e.target.dataset.id;
                handler(id);
            }
        });
    }
}