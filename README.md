# tensorGo-project
Invoice Management System

This repository contains a full-stack application for managing invoices. The backend is built with Node.js, Express, and Passport for authentication, while the frontend is built with React. The application includes functionalities for Google authentication, email notifications for due invoices, and integrations with Zapier for automation.

Features:

Google OAuth 2.0 authentication
Automated email reminders for due invoices
Integration with Zapier for automation
Schedule custom actions and emails
Setup and Installation
Prerequisites
Make sure you have the following installed on your machine:

Node.js (v12.x or later)
npm (v6.x or later)
Git
Create React App

Backend Setup
1.Clone the repository:https://github.com/Bharath292003/tensorGo-project.git
2.Navigate to the backend directory:cd backend
3.Install the dependencies: npm install
4.Create a .env file in the backend directory with the following content:
        GOOGLE_CLIENT_ID=your-google-client-id
        GOOGLE_CLIENT_SECRET=your-google-client-secret
        EMAIL_USER=your-email@example.com
        EMAIL_PASS=your-email-password
5. Run the backend server:node index.js

Frontend Setup
1.Navigate to the frontend directory: cd ../frontend
2.Install the dependencies: npm install
3.Run the frontend server: npm start

Email Templates
Ensure that you have the necessary email templates in the backend/emailTemplates directory. For this setup, you should have a template named invoiceReminder.hbs.

Usage
Open your browser and navigate to http://localhost:3000.
Click on the "Login" button to authenticate using Google.
Once authenticated, you will be redirected to the Invoices page where you can see the list of due invoices.
Use the provided buttons to schedule actions or customize emails for each invoice.

Scheduling Actions
Click on the "Schedule Action" button next to an invoice.
Enter the date and time in the prompt (format: YYYY-MM-DDTHH:MM:SS).
The action will be scheduled and a reminder email will be sent at the specified time.

Customizing Emails
Click on the "Customize Email" button next to an invoice.
Enter the email subject and template name in the prompts.
The custom email will be sent to the invoice recipient.

Triggering Automation
Click on the "Trigger Email" button to trigger the automation workflow using Zapier.
The system will check for overdue invoices and trigger the Zapier webhook.

Contributing
We welcome contributions! Please read our Contributing Guide for more information on how to contribute to this project.

License
This project is licensed under the MIT License. See the LICENSE file for details.
