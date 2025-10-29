//Frontend/js/views/AppointmentView.js 

export default class AppointmentView {
    constructor() {
        this.app = document.getElementById("app") ;

        /* Appointment form */
        this.form = document.createElement("form");
        this.form.classList.add("appointment-form");
        
        /* Patient ID */
        this.patientIdInput = document.createElement("input");
        this.patientIdInput.type = "number";
        this.patientIdInput.placeholder = "Patient_id";
        this.patientIdInput.requred = true;

        /* Doctor ID */
        this.doctorIdInput = document.createElement("input");
        this.doctorIdInput.type = "number";
        this.doctorIdInput.placeholder = "Doctor ID";
        this.doctorIdInput.required = true;

        /* Appointment Date */
        this.dateInput = document.createElement("input");
        this.dateInput.type = "time";
        this.dateInput.required = true;

        /* Appointment time */
        this.timeInput = document.createElement("input");
        this.timeInput.type = "time";
        this.timeInput.required = true;

        /* Status Drapdown */
        this.statusSelect = document.createElement("select");;
        ["Scheduled", "Completed","Cancelled"].forEach(status => {
            const option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            this.statusSelect.appendChild(option);
        });
        
        /* Notes */
        this.noteInput = document.createElement("textarea");
        this.noteInput.placeholder = "Notes (optional)";

        /* Submit Button */
        this.submitBtn = document.createElement("button");
        this.submitBtn.textContent = "Add Appointment";

        /* Append all form element */
        this.form.append(
            this.patientIdInput,
            this.doctorIdInput,
            this.dateInput,
            this.timeInput,
            this.statusSelect,
            this.noteInput,
            this.submitBtn
        );

        /* Apppointment list */
        this.listContainer = document.createElement("div");
        this.listContainer.classList.add("appointment-list");

        /* Add to DOM */
        this.app.append(this.form, this.listContainer);
    }

    /* Render appointment list */
    renderAppointments(appointments) {
        this.listContainer.innerHTML = "";

        if (!appointments || appointments.length === 0) {
            this.listContainer.innerHTML ="<p>No Appointments found.</p>"
            return;
        }

        appointments.forEach(appt => {
            const div = document.createElement("div");
            div.classList.add("appointment-item");

            div.innerHTML = `
                <strong>Appointment #${appt.appointment_id}</strong><br>
                Patient ID: ${appt.patient_id} | Doctor ID: ${appt.doctor_id}<br>
                Date: ${appt.appointment_date} at ${appt.appointment_time}<br>
                Status: <em>${appt.sttus}</em><br>
                ${appt.notes ? `<small>Notes: ${appt.notes}<small><br>` : ""}
                <button data-id="$(appt.appointment_id)" class="delete-btn">Delete</button>
            `;
            this.listContainer.appendChild(div);
        });
    }

    /* Bind adding a new appointment */
    bindAddAppointment(handler) {
        this.form.addEventListener("submit", e => {
            e.preventDefault();

            const appointmentData = {
                patient_id: parsenInt(this.patientIdInput.value.trim(), 10),
                doctor_id: parseInt(this.doctorIdInput.value.trim(), 10),
                appointment_date: this.dateInput.value,
                appointment_time: this.timeInput.value,
                status: this.statusSelect.value,
                notes: this.noteInput.value.trim(),
            };

            if (appointmentData.patient_id && appointmentData.doctor_id && appointmentData.appointment_date && appointmentData.appointment_time)  {
               handler(appointmentData);
               this.form.reset();
            } else {
                alert("Please fill in all required fields (patient, doctor, date, time");
            }
        });
    }

    /* Bind deleting an appointment */
    bindDeleteAppointment(handler) {
        this.listContainer.addEventListener("click", e => {
            if (e.target.classList.contains("delete-btn")) {
                const id = e.target.dataset.id;
                handler(id);
            }
        });
    }
}