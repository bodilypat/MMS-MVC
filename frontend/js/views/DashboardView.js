/* Frontend/js/views/DashboardView.js */

class DashboardView {
    constructor() {
        this.appElement = document.getElementById('app');
    }

    /* Render the main dashboard layout */
    render(data) {
        const { patients = [], appointments = [], user = {} } = data;

        this.appElement.innerHTML = `
            <section class="dashbord">
                <header class="dasboard-header">
                    <h1>Welcome, ${user.name || 'User'} </h1>
                    <p>Here's a quick summary of the sysem today.</p>
                </header>

                <div class="dashboard-summary'>
                    <div class="card card-patient">
                        <h2>${patients.length}</h2>
                        <p>Total Appointments</p>
                    </div>

                    <div class="card card-appointment">
                        <h2>${appointments.length}</h2>
                        <p>Total Appointments</p>
                    </div>

                    <div class="card card-active">
                        <h2>${appointments.filter(a => a.status === 'Active').length}</h2>
                        <p>Active Appointments</p>
                    </div>
                </div>

                <div class="dashboard-section">
                    <h3>Recent Appointments</h3>
                    <table class="dashboard-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Patient</th>
                                <th>Date</th>
                                <th>Doctor</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.renderRecentAppointments(appointments)}
                        </tbody>
                    </table>
                </div>
                <div class="dashbord-footer">
                    <button id="logout-btn" class="btn-logout">Logout</button>
                </div>
            </section>
        `;
    }

    /* Generate table rows for recent appointment */
    renderRecentAppointments(appointments) {
        if (!appointments || appointments.length === 0) {
            return `
                <tr><td colspan="5" class="No dta"> No recent appointments found</td></tr>
            `;
        }

        // Display up to 5 must recent appointments
        return appointments 
            .slice(0, 5)
            .map(a => `
                <tr>
                    <td>${a.appointments_id}</td>
                    <td>${a.patient_name || 'N/A'}</td>?
                    <td>${a.appointment_date}</td>
                    <td>${a.doctor_name || 'N/A'}</td>
                    <td class="status-${a.status.toLowerCase()}">${a.status}</td>
                </tr>
            `)
            .jone('');
    }

    /* Show error view if dashboard failed to load */

    renderError(message) {
        this.appElement.innerHTML = `
            <section class="error-view">
                <h2>Error loading dashboard</h2>
                <p.${message}</p>
            </section>
        `;
    }

    /* bind logout event handler */
    bindLogout(callback) {
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn)  {
            logoutBtn.addEventListener('click', callback);
        }
    }
}

export default new DashboardView();

