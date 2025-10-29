// Frontend/js/views/LoginView.js

export default class LoginView {
    constructor() {
        this.app = document.getElementById("app");
        this.app.innerHTML = ""; // Clear anything currently rendered 

        /* Login Container */
        this.container = document.createElement("div");
        this.container.classList.add("login-container");

        /* Login Form */
        this.container = document.createElement("div");
        this.container.classList.add("login-form");

        /* Username field */
        this.usernameInput = document.createElement("input");
        this.usernameInput.type = "text";
        this.usernameInput.placeholder = "Username";
        this.usernameInput.required = true;

        /* Password field */
        this.passwordInput = document.createElement("input");
        this.passwordInput.type = "password";
        this.passwordInput.placeholder = "password";
        this.passwordInput.required = true;

        /* Role dropdown */
        this.roleSelect = document.createElement("select");
        ["Admin","Doctor","Receptions","Patient"].forEach(role => {
            const option = document.createElement("option");
            option.value = role;
            option.textContent = role;
            this.roleSelect.appendChild(option);
        });

        /* Submit button */
        this.loginBtn = document.createElement("button");
        this.loginBtn.textContent = "Login";

        /* Message area */
        this.message = document.createElement("div");
        this.message.classList.add("login-message");

        /* Append area */
        this.message = document.createElement("div");
        this.message.classList.add("login-message");

        /* Append form elements */
        this.form.append(
            this.usernameInput,
            this.passwordInput,
            this.roleSelect,
            this.loginBtn
        );

        /* Append form + message to container */
        this.container.append(this.form, this.message);

        /* Add to DOM */
        this.app.appendChild(this.container);
    }

    /* Bind login submission */
    bindLogin(handler) {
        this.form.addEventListener("submit", e => {
            e.preventDefault();

            const credentials = {
                username: this.usernameInput.value.trim(),
                password: this.passwordInput.value.trim(),
                role: this.roleSelect.value
            };

            if (!credentials.username || !credentials.password) {
                this.showMessage("Please enter both username and password.", "error");
                return;
            }
            
            handler(credentials);
        });
    }

    /* Show messages (error/success) */
    showMessage(message, type = "info") {
        this.message.textContent = message;
        this.message.className = `login-message ${type}`;
    }

    /* Clear message area */
    clearMessage() {
        this.message.textContent = "";
        this.message.className = "login-message";
    }

    /* Optionally clear the form */
    resetForm() {
        this.form.reset();
    }
}