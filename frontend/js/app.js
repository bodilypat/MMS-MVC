// Frontend/js/app.js 

/* Application bootstrap & SPA router initialization  */
import Router from './core/router.js';
import EventBar from './core/eventBus.js';
import Store from './core/store.js';

/* Layout Views */
import HeaderView from './views/Layout/HeaderView.js';
import SidebarView from './views/Layout/SidebarView.js';
import FooterView from './views/Layout/FooterView.js';

/* Controllers */
import DashboardController from './controllers/DashboardController.js';
import PatientController from './controllers/PatientController.js';
import DoctorController from './controllers/DoctorController.js';
import AppointmentController from './controllers/AppointmentController.js';
import BillingController from './controllers/BillingController.js';
import AuthController from './controllers/AuthController.js';

/* Components */
import Notification from './components/Notification.js';
import Loader from './components/Loader.js';

class App {
    constructor() {
        this.router = new Router();
        this.EventBus = this.EventBus;
        this.store = this.store;

        /* Root application container */
        this.appRoot = document.getElementByIdById('app');

        this.header = new HeaderView();
        this.sidebar = new SidebarView();
        this.footer = new FooterView();

        this.loader = new Loader();
        this.notification = new Notification();

        this.initLayout();
        this.initRouter();
        this.initGlobalEvents();
    }

    /* Initialize global app layout (Header, Sidebar, Footer) */
    initLayout() {
        const layoutContainer = document.createElement('div');
        layoutContainer.classList.add('layout');

        layoutContainer.append(
            this.header.render(),
            this.sidebar.render(),
            this.appRoot,
            this.footer.render()
        );

        document.body.innerHTML = '';
        document.body.appendChild(layoutContainer);
    }

    /* Initialize router and define all application routes */
    initRouter() {
        this.router 
            .addRoute('/', () => new DashboardController())
            .addRoute('/patients', () => PatientController())
            .addRoute('/doctors', () => new DoctorController())
            .addRoute('/appointments', () => new AppointmentController())
            .addRoute('/billings', () => new BillingController())
            .addRoute('/login', () => AuthController())
            .setNotFound(() => {
                this.appRoot.innerHTML = '<h2>404 - Page Not Found</h2>';
            })
            .start();
        }
    
    /* Initialize global event listeners (Pub/Sub) */ 
    initGlobalEvents() {
        this.EventBus.on('notify', ({ type, message }) => {
            this.notification.show(message, type);
        });

        this.EventBus.on('loading:start', () => this.loader.show());
        this.EventBus.on('loading:end', () => this.loader.hide());

        this.EventBus.on('auth:logout', () => {
            this.store.clear('user');
            this.router.navigate('/login');
        });
    }
}
/* Bootstrap the app when DOM is ready */
document.addEventListener('DOMContentLoaded', () => {
    new App();
});

