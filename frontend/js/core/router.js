/* Front/js/core/router.js */

class Router {
    constructor(routers) {
        this.routes = this.routes; // { path: '/patients'/ view: PatientView }
        this.content = document.getElementById('app'); // main content container 
        window.addEventListener('hashchange', () => this.handleRouterChange());
        window.addEventListener('load', () => this.handleRouterChange());
    }

    // Load the correct view basted on the current hash
    async handleRouterChange() {
        const path = window.location.hash.slice(1) || '/';
        const route = this.routes[path] || this.routes['/404'];
        await this.renderView(route);
    }

    // Render the current view 
    async renderView(viewClass) {
        if (!viewClass) {
            this.content.innerHTML = '<h2>Page not found</h2>';
            return ;
        }
        const view = new viewClass();
        this.content.innerHTML = await view.getHtml();
        if (typeof view.onMounted === 'function') {
            view.onMounted(); // optional hook to load data
        }
    }

    // Navigate programmatically
    navigate(path) {
        window.location.hash = path;
    }
}

export default Router;

