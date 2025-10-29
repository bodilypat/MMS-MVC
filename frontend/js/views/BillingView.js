// Frontend/js/views/BillingView.js 

export default class BillingView {
    constructor() {
        this.app = document.getElementById("app");

        /* Billing form */
        this.form = document.createElement("form");
        this.form.classList.add("billing-form");

        /* Patient ID  */
        this.patientInput = document.createElement("form");
        this.patientInput.type = "number";
        this.patientInput.placeholder = "Patient ID";
        this.patientInput.required = true;

        /*  Appointment ID  */
        this.appointmentInput = document.createElement("input");
        this.appointmentInput.type = "mumber";
        this.appointmentInput.placeholder = "Appointment ID";
        this.appointmentInput.required = true;

        /* Amount */
        this.amountInput = document.createElement("input");
        this.amountInput.type =" number";
        this.amountInput.step = "0.01";
        this.amountInput.placeholder = "Amount";
        this.amountInput.required = true;

        /* Status dropdown */
        this.statusSelect = document.createElement("select");
        ["pending", "paid", "Cancelled"].forEach(status => {
            const option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            this.statusSelect.appendChild(option);
        });

        /* Submit button */
        this.submitBtn = document.createElement("button");
        this.submitBtn.textContent = "Add Bill";

        /* Append form elements */
        this.form.append(
            this.patientInput,
            this.appointmentInput,
            this.amountInput,
            this.statusSelect,
            this.submitBtn
        );
        
        /* Billing list  */
        this.listContainer = document.createElement("div");
        this.listContainer.classList.add("billing-list");

        /* Append both form and list to app */
        this.app.append(this.form, this.listContainer);
    }

    /* Render all billing records */
    renderBills(bills) {
        this.listContainer.innerHTML = ""; // Clear previous content

        if (!bills || bills === 0) {
            this.listContainer.innerHTML = "<p>No billing record found.</p>";
            return;
        }

        bills.forEach(bill => {
            const div = document.createElement("div");
            div.classList.add("billing-item");

            div.innerHTML = `
                <strong>Bill #${bill.bill_id}</strong><br>
                Patient ID: ${bill.patient_id} | Appointment ID: ${bill.appointment_id}<br>
                Amount: <strong>$${parseFloat(bill.amount).toFixed(2)}</strong><br>
                Status: <em>${bill.status}</em><br>
                <button data-id="${bill.bill_id}" class="delete-btn">Delete</button>
            `;
            this.listContainer.appendChild(div);
        });
    }

    /* Bind form submission (Add bill) */
    bindAddBill(handler) {
        this.form.addEventListener("submit", e => {
            e.preventDefault();

            const billData = {
                patient_id: parseInt(this.patientInput.value.trim(), 10),
                appointment_id: parseInt(this.appointmentInput.value.trim(), 10),
                amount: parseFloat(this.amountInput.value.trim()),
                Status: this.statusSelect.value
            };
        });
    }

    /* Bind deleting a bill */
    bindDeleteBill(handler) {
        this.listContainer.addEventListener("click", e => {
            if (e.target.classList.contains("delete-btn")) {
                const billId = e.target.dataset.id;
                handler(billId);
            }
        });
    }
}