Full-Stack-Medical-Management System-Directory-Structure
├── backend/                                                   # Backend RESTful API (PHP MVC)
│   │ 
│   ├── app/                                               
│   │   ├── /controllers/                                      # Controllers handle HTTP requests
│   │   │   ├── PatientController.php 
│   │   │   ├── DoctorController.php                           
│   │   │   ├── AppointmentController.php             
│   │   │   └── AuthController.php
│   │   ├── /models/                                           # Models handle database interation
│   │   │   ├── Patient.php      
│   │   │   ├── Doctor.php                       
│   │   │   ├── Appointment.php             
│   │   │   └── User.php
│   │   ├── core/		                                       # Core utilites & framework Logic
│   │   │   ├── Database.php 
│   │   │   ├── Router.php                         
│   │   │   ├── Response.php             
│   │   │   └── Auth.php
│   │   ├── config/		                                       # Configuration files               
│   │   │   ├── config.php                                     # DB credentials, environment setup                                               
│   │   │   └── constants.php		                           # Global constants
│   │   └── helper/          
│   │       ├── Validator.php                                  # Optioal: extra functions
│   │       └── Utils.php                      
│   ├── public/                                                # Public-facing direction (entry point)
│   │   ├── index.php                                          # API entry point
│   │   └── .htaccess                                          # URL rewriting for clean endpoints
│   ├── storage/                                               # For peristent files (Logs, upload, reports)
│   │  	├── logs/
│   │   │   └── api.log
│   │   └── uploads/ 
│   │        └── patient_docs/  
│   │    
│   ├── tests/                                                 # Unit and integration tests (Optional)
│   │   └── PatientTest.php 
│   ├── vendor/                                                # Composer dependencies
│   │   
│   ├── composer.json                                          # For autoloading and package management
│   └── README.md                                                                 
│
├── frontend/                                                  # Frontend Static or SPA (Java Script MVC)       
│   ├── index.html                                             # Main entry point (Dashbord or Login)
│   ├── css/   
│   │   ├── style.css                                          # Stylesheets
│   │   └── theme.css                                          # Theme variables/colors
│   ├── js/  
│   │   ├── app.js                                             # Application bootstrap & router initialization
│   │   │                           
│   │   ├── core/                                              # Core utilities (Shared Logic)
│   │   │   ├── api.js                                         # Handles API calls (fetch/axios)
│   │   │   ├── router.js                                      # SPA navigation (hash-based or pushState)
│   │   │   └── utils.js                                       # Helper functions ( formatting, validation)
│   │   │ 
│   │   ├── models/                                            # Frontend Models ( data layer)
│   │   │   ├── PatientModel.js                     
│   │   │   ├── DoctorModel.js             
│   │   │   └── AppointmentModel.js
│   │   │ 
│   │   ├── views/                                             # Responsible for rendering UI components
│   │   │   ├── DashboardView.js      
│   │   │   ├── PatientView.js                  
│   │   │   ├── DoctorView.js             
│   │   │   └── AppointmentView.js
│   │   │ 
│   │   └── controllers/                                       # Handle user interactions & connect Model <-> View
│   │ 		├── DashboardController.js
│   │   	├── PatientController.js
│   │   	├── DoctorController.js                   
│   │   	└── AppointmentController.js       
│   ├── assets/                                                # Static assets ( images, icon, fonts )
│   │   ├── images/
│   │   │   ├── logo.png            
│   │   │   ├── doctor.svg      
│   │   │   └── patient.svg
│   │   ├── fonts/
│   │   └── icons/              
│   │ 
│   ├── pages/                                                 # HTML hemplates or partials for SPA views
│   │   ├── dashboardh.html
│   │   ├── patient.html
│   │   ├── doctors.html
│   │   └── appointments.html
│   ├── components/                                            # Optional reusable UI components ( modals, table, forms)
│   │   ├── Modal.js
│   │   └── Table.js
│   │ 
│   └── README.md                 
│
└── docs/                                                      # Documention folder
	├── API.md                                                 # Backend API document (endpoints)
	├── FRONTEND.md                                            # Frontend usage and architecture
	├── SETUP.md                                               # Setup instructions for developers
    └── ERD.png                                                # Database ER diagram

Frontend(JS MVC) ->PatientController.js->PatientModel.js->Api.js(fetch)

backend(PHP MVC) -> Router.php -> PatientController.php -> Patient.php(Modal) -> Database.php

Response.php -> returns JSON -> displayed by PatientView.js 

Backend server:  http://localhost/medical-ms/backend/public/

Frontend app: http://localhost/medical-ms/frontend/index.html
