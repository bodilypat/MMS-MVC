// Frontend/js/core/router.js 

export default class Router {
    constructor() {
        this.routes = {}; /* Registered routes */
        this.notFound = null; /* Fallback route handler */ 
        this.currentController = null; /* Keep track of active controller */
    }

    /* Register a new route */
    addRoute(path, callback) {
        this.routes[path] = callback;
        return this;
    }

    /* Start router: attach hash change listener and local initial route */
    start() {
        window.addEventListener('hashchange', () => this._handleRouteChange());
        this._handleRouteChange();
        return this;
    }

    /* Navigate programmatically to a route */
    navigate(path) {
        window.location.hash = `#${path}`;
    }

    /* Internal: Parse current route and render appropriate controller */
    _handleRouteChange() {
        const path = window.location.hash.replace('#', '') || '/';
        const routeHandler = this.routes[path];

        /* Clean up previous controller if needed */
        if (this.currentController && typeof this.currentController.destroy === 'function') {
            this.currentController.destroy();
        }

        /* Execute route */
        if (routeHandler) {
            try {
                this.currentController = routeHandler();
            } catch (error) {
                console.error(`Error rendering route "${path}":`, error);
            }
        } else {
            document.getElementById('app').innerHTML = `<h2>404 - Page Not Found</h2>`;
        }
    }
}