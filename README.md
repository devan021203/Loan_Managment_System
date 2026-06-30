# Loan_Managment_System

📖 Description

A full-stack Bank Management System built using Django (backend) and Angular (frontend).
The system allows users to apply for loans, manage applications, and provides an admin dashboard to monitor and control data.

🚀 Features
    
👤 User Side
    Apply for loan
    View loan status

🛠️ Admin Side
    View all loan applications
    Approve / Reject loans
    Dashboard with data

🏗️ Tech Stack
    Frontend: Angular
    Backend: Django (REST API)
    Database: SQLite

⚙️ Setup Instructions
    🔹 Backend (Django)
        cd backend
        python -m venv venv
        venv\Scripts\activate
        pip install -r requirements.txt
        python manage.py migrate
        python manage.py runserver

    🔹 Frontend (Angular)
        cd frontend
        npm install
        ng serve
