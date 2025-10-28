Frontend/js/controllers/DashboardController.js 

import PatientModel from '../models/PatientModel.js';
import AppointmentModel from '../models/AppointmentModel.js';
import AuthModel from '../models/AuthModel.js';

class DashboardController {
    constructor() {
        this.appElement = document.getElementById('app');
    }

    /* Render the dashboard view */
    async render() {
        try {
            // verify authentication
            if (!AuthModel.isAuthenticated()) {
                window.location.hash = '#/login';
                return;
            }
            // Fetch essential dashboard data
            const [patients, appointments] = await Promise.all([
                PatientModel.fetchAll(),
                AppointmentModel.fetchAll()
            ]);

            // Render the main dashboard layout 
            this.appElement.innerHTML = this.getDashboardTemplate(patients, appointments);

            // Bind event listeners 
            this.bindEvents();
        } catch (error) {
            console.error('DashboardController: Error rending dashboard', error);
            this.appElement.innerHTML = `
                <section class="error-view"></section>
                    <h2>Error loading dashboard</h2>
                    <p>${error.message}</p>
            `;
        }
    }

    /* Dashboard HTTP template , @param {Array} patients, @param {Array} appointment */
    getDashboardTemplate(patients, appointments) {
        return `
            <section class="dashboard">
                <h1>Dashboard Overview</h1>
                
                <div class="dashboard-summary">
                    <div class="card">
                        <h2>${appointments.length}</h2>
                        <p>Registered Patients</p>
                    </div>
                    <div class="card">
                        <h2>${appointments.length}</h2>
                        <p>Total Appointments</p>
                    </div>
                </div>
                
                <div class="dashboard-details">
                    <h3>Recent Appointments</h3>
                    <table class="dashboard-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Patient</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${appointments.slice(0, 5).map(a => `
                                <tr>
                                    <td>${a.appointment_id}</td>
                                    <td>${a.patient_name || 'N/A'}</td>
                                    <td>${a.appointment_date}</td>
                                    <td>${a.status}</td>
                                </tr>
                                `).join('')}
                        </tbody>
                    </table>
                </div>

                <button id="logout-btn" class="btn-logout">Logout</button>
            </section>
        `;
    }

    /* Bind UI events like logout */
    bindEvents() {
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                await AuthModel.logout();
                window.location.hash ='#login';
            });
        }
    }
}

export default new DashboardController;
