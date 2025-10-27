Full-Stack-Medical-Management System-Directory-Structure
├── backend/                                                   # Backend RESTful API (PHP MVC Architecture)
│   │
│   ├── public/                                                # Web root (exposed to HTTP)
│   │   ├── index.php                                          # Entry point for all API requests
│   │   ├── .htaccess                                          # Apache rewrite for clean URLS
│   │   └── upload/                                            # Publicly accessible upload
│   │       ├── config.php                                      
│   │       ├── constants.php                                        
│   │       └── routes.php	
│   ├── app/                                                   # Application source  
│   │   ├── config/		                                       # Configuration files               
│   │   │   ├── app.php                                        # App-level configs (debug , timezone)   
│   │   │   ├── database.php                                   # DB connection credentials 
│   │   │   ├── constants.php                                  # Global constrants (paths, status codes)
│   │   │   └── routes.php		                               # Central route definitions  
│   │   │  
│   │   ├── core/		                                       # Core classes (framework logic)
│   │   │   ├── App.php                                        # Main application runner
│   │   │   ├── Router.php                                     # Routing engine
│   │   │   ├── Controller.php                                 # Base Controller class
│   │   │   ├── Model.php                                      # Base Model (shared DB access)
│   │   │   ├── Database.php                                   # PDO connection handler
│   │   │   ├── Request.php                                    # Handle HTTP input          
│   │   │   ├── Response.php                                   # JSON response builder
│   │   │   ├── Auth.php                                       # Authentication Logic   (JWT/session handling)  
│   │   │   ├── Middleware.php                                 # Middleware base case           
│   │   │   └── ErrorHandler.php                               # Global middleware handler 
│   │   │                                         
│   │   ├── controllers/                                       # Controllers = endpoint handler
│   │   │   ├── Api/ 
│   │   │   │ 	├── PatientController.php
│   │   │   │ 	├── DoctorController.php
│   │   │   │ 	├── AppointmentController.php
│   │   │   │ 	├── BillingController.php
│   │   │   │ 	├── ReportController.php
│   │   │   │   └── AuthController.php       
│   │   │   └── web/
│   │   │       └── HomeController.php    
│   │   │
│   │   ├── models/                                            # Models handle database interation
│   │   │   ├── Patient.php      
│   │   │   ├── Doctor.php                       
│   │   │   ├── Appointment.php    
│   │   │   ├── Billing.php         
│   │   │   └── User.php
│   │   │
│   │   ├── middleware/		                                   # Request-Level middleware          
│   │   │   ├── AuthMiddleware.php                             # Verifies JWT/session       
│   │   │   ├── CoreMiddleware.php 
│   │   │   ├── LoggerMiddleware.php                                      
│   │   │   └── ReteLimitMiddleware.php                        # Log requests/response
│   │   │
│   │   ├── services/                                          # Reusable business service
│   │   │   ├── EmailService.php                               # Send notifications
│   │   │   ├── PDFService.php                                 # Generate reports/invoices       
│   │   │   ├── FileUploadService.php                          # Handle file uploads
│   │   │   ├── TokenService.php                               # JWT creation & validation
│   │   │   └── ReportService.php                              # Aggregate data for analytics
│   │   │
│   │   ├── helpers/                                           # General-purpose functions
│   │   │   ├── Validator.php                                  # Input validator helpers
│   │   │   ├── Utils.php                                      # Gemeral formatting/sanitization
│   │   │   ├── ResponseHelper.php                             # Common JSON response pattern
│   │   │   └── DateHelper.php                                 # Date/time formatting
│   │   │
│   │   └── bootstrap.php/                                     # Initialize app(autoload, env, routes)
│   │                                                          
│   ├── storage/                                               
│   │  	├── logs/                                              
│   │   │   ├── app.log     
│   │   │   └── error.log
│   │  	├── cache/                                             # For temporary files, tokens
│   │   └── uploads/ 
│   │       ├── patients/   
│   │       ├── doctors/  
│   │       └── reports  
│   │    
│   ├── tests/                                                 # Unit and integration tests (Optional)
│   │  	├── controllers/
│   │   │   └── PatientControllerTest.php
│   │  	├── Models/ 
│   │   │   └── PatientControllerTest.php
│   │   └── bootstrap.php                                      # PHPUnit setup
│   │ 
│   ├── vendor/                                                # Composer dependencies
│   │   
│   ├── composer.json                                          # For autoloading and package management
│   └── README.md                                                                 
│
├── frontend/                                                  # Frontend Static or SPA (Java Script MVC)       
│   ├── index.html                                             # Main entry point (Dashbord or Login)
│   ├── css/   
│   │   ├── style.css                                          # Core stylesheets
│   │   ├── theme.css                                          # Theme Variable
│   │   └── component                                          # Theme variables/colors
│   ├── js/  
│   │   ├── app.js                                             # Application bootstrap & router initialization
│   │   ├── main.js   
│   │   │                           
│   │   ├── core/                                              # Core utilities (Shared Logic)
│   │   │   ├── api.js                                         # Handles API calls (fetch/axios)
│   │   │   ├── router.js                                      # SPA navigation (hash-based or pushState)
│   │   │   ├── eventBus.js                                    # Pub/Sub event communication
│   │   │   ├── store.js                                       # Central state management
│   │   │   └── utils.js                                       # Helper functions ( formatting, validation)
│   │   │ 
│   │   ├── models/                                            # Frontend Models ( data layer)
│   │   │   ├── PatientModel.js                     
│   │   │   ├── DoctorModel.js     
│   │   │   ├── AppointmentModel.js        
│   │   │   ├── BillingModel.js             
│   │   │   └── AuthModel.js
│   │   │ 
│   │   ├── views/                                             # Responsible for rendering UI components
│   │   │   ├── Layout/
│   │   │   │ 	├── HeaderView.js
│   │   │   │ 	├── SidebarView.js
│   │   │   │   └── FooterView.js
│   │   │   ├── DashboardView.js      
│   │   │   ├── PatientView.js                  
│   │   │   ├── DoctorView.js       
│   │   │   ├── AppointmentView.js     
│   │   │   ├── BillingView.js         
│   │   │   └── LoginView.js
│   │   │ 
│   │   ├── controllers/                                       # Responsible for rendering UI components
│   │   │   ├── DashboardController.js      
│   │   │   ├── PatientController.js                  
│   │   │   ├── DoctorController.js       
│   │   │   ├── AppointmentController.js  
│   │   │   ├── BillingController.js            
│   │   │   └── AuthController.js
│   │   │ 
│   │   └── components/                                        # Handle user interactions & connect Model <-> View
│   │ 		├── Modal.js                                       # Dialog/modal UI
│   │   	├── Table.js                                       # Reusable data Table
│   │   	├── Form.js                                        # Dynamic form generator
│   │   	├── Pagination.js                                  # Reusable Pagination Component
│   │   	├── Leader.js                                      # Loading spinner or overlay
│   │   	└── Notification.js                                # Toast/alert message
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
│   │   ├── appointment.html
│   │   ├── billing.html
│   │   └── login.html
│   │ 
│   └── README.md                 
│
└── docs/                                                      # Documention folder
	├── API.md                                                 # Backend API document (endpoints)
	├── FRONTEND.md                                            # Frontend usage and architecture
	├── SETUP.md                                               # Setup instructions for developers
	├── DEPLOYMENT.md                                          # Deployment instruction
    └── ERD.png                                                # Database ER diagram

Frontend(JS MVC) ->PatientController.js->PatientModel.js->api.js(fetch) -> PHP RESTful API
                        |
						V (updates)
				   PatientView.js -> component/Table + Form + Notification

backend(PHP MVC) -> Router.php -> PatientController.php -> Patient.php(Modal) -> Database.php

Response.php -> returns JSON -> displayed by PatientView.js 

Backend server:  http://localhost/medical-ms/backend/public/

Frontend app: http://localhost/medical-ms/frontend/index.html
