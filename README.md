# tensorGo-project
Invoice Management System

This repository contains a full-stack application for managing invoices. The backend is built with Node.js, Express, and Passport for authentication, while the frontend is built with React. The application includes functionalities for Google authentication, email notifications for due invoices, and integrations with Zapier for automation.

Project Screenshots:
1. LOGIN PAGE
   
![Screenshot (193)](https://github.com/Bharath292003/tensorGo-project/assets/98509219/24a818ad-19a0-4196-86a6-70c3b6a296a0)

![Screenshot (194)](https://github.com/Bharath292003/tensorGo-project/assets/98509219/f7c50039-3916-4a7b-9e25-f5385ef44480)


2.INVOICES PAGE


![Screenshot (196)](https://github.com/Bharath292003/tensorGo-project/assets/98509219/081e3500-c874-44ba-8255-d9ffee79f849)

3.SCHEDULING ACTION


![Screenshot (197)](https://github.com/Bharath292003/tensorGo-project/assets/98509219/34add5f6-1d7a-40c6-a6ac-1e3e5868b944)


4.CUSTOMIZE EMAIL


![Screenshot (198)](https://github.com/Bharath292003/tensorGo-project/assets/98509219/d3ef980c-11db-43e9-89b4-f83139689a55)


5.MAIL TRIGGER


![Screenshot (199)](https://github.com/Bharath292003/tensorGo-project/assets/98509219/ae764b22-e148-46b7-be44-2448dfc4cf2d)

![Screenshot (200)](https://github.com/Bharath292003/tensorGo-project/assets/98509219/62d99890-cdc1-4736-b11d-78b03a6d57cd)


6.MAIL TRACKING STATUS

![Screenshot (201)_LI](https://github.com/Bharath292003/tensorGo-project/assets/98509219/8ea8b371-96eb-44be-b69f-5cd27996c672)

FEATURES:

Google OAuth 2.0 authentication
Automated email reminders for due invoices
Integration with Zapier for automation
Schedule custom actions and emails
Setup and Installation
Make sure you have the following installed on your machine:

Node.js (v12.x or later)
npm (v6.x or later)
Git
Create React App

BACKEND SETUP:

1.Clone the repository:https://github.com/Bharath292003/tensorGo-project.git

2.Navigate to the backend directory:cd backend

3.Install the dependencies: npm install

4.Create a .env file in the backend directory with the following content:

        GOOGLE_CLIENT_ID=your-google-client-id
        GOOGLE_CLIENT_SECRET=your-google-client-secret
        EMAIL_USER=your-email@example.com
        EMAIL_PASS=your-email-password
5. Run the backend server:node index.js

FRONTEND SETUP:

1.Navigate to the frontend directory: cd ../frontend

2.Install the dependencies: npm install

3.Run the frontend server: npm start

EMAIL TEMPLATES:

Ensure that you have the necessary email templates in the backend/emailTemplates directory. For this setup, you should have a template named invoiceReminder.hbs.

USAGE:

Open your browser and navigate to http://localhost:3000.

Click on the "Login" button to authenticate using Google.

Once authenticated, you will be redirected to the Invoices page where you can see the list of due invoices.

Use the provided buttons to schedule actions or customize emails for each invoice.

SCHEDULING ACTIONS:

Click on the "Schedule Action" button next to an invoice.

Enter the date and time in the prompt (format: YYYY-MM-DDTHH:MM:SS).

The action will be scheduled and a reminder email will be sent at the specified time.

CUSTOMIZING EMAILS:

Click on the "Customize Email" button next to an invoice.

Enter the email subject and template name in the prompts.

The custom email will be sent to the invoice recipient.

TRIGERRING AUTOMATION:

Click on the "Trigger Email" button to trigger the automation workflow using Zapier.

The system will check for overdue invoices and trigger the Zapier webhook.

CONTRIBUTING:

We welcome contributions! Please read our Contributing Guide for more information on how to contribute to this project.

LICENSE:

This project is licensed under the MIT License. See the LICENSE file for details.


