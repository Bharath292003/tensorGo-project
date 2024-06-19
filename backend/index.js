const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
dotenv.config();

const app = express();


app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback"
},
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, subject, templateName, context) => {
  const templateFile = fs.readFileSync(`./emailTemplates/${templateName}.hbs`, 'utf8');
  const template = handlebars.compile(templateFile);
  const html = template(context);

  const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
  };

  await transporter.sendMail(mailOptions);
};

const invoices = [
  { id: 1, amount: 100, dueDate: '2023-12-31', recipient: 'Customer A', email: 'customerA@example.com',status: 'pending' },
  { id: 2, amount: 200, dueDate: '2023-11-30', recipient: 'Customer B', email: 'customerB@example.com',status: 'pending' },
  { id: 3, amount: 150, dueDate: '2024-01-15', recipient: 'Customer C', email: 'customerC@example.com',status: 'pending'  },
  { id: 4, amount: 300, dueDate: '2023-10-31', recipient: 'Customer D', email: 'customerD@example.com',status: 'pending' },
  { id: 5, amount: 250, dueDate: '2024-02-28', recipient: 'Customer E', email: 'customerE@example.com',status: 'pending' },
];
const scheduleAutomation = (invoiceId, date) => {
  schedule.scheduleJob(date, async function() {
      const invoice = invoices.find(inv => inv.id === invoiceId);
      if (invoice) {
          await sendEmail(invoice.email, 'Invoice Due Reminder', 'invoiceReminder', invoice);
          console.log(`Reminder email sent for invoice ${invoice.id}`);
          invoice.status = 'reminder_sent'; 
      }
  });
};

const updateInvoiceStatus = (invoiceId, status) => {
  const invoice = invoices.find(inv => inv.id === invoiceId);
  if (invoice) {
      invoice.status = status;
  }
};



const checkOverdueInvoicesAndSendReminders = async () => {
  const currentDate = new Date();
  const overdueInvoices = invoices.filter(invoice => new Date(invoice.dueDate) < currentDate && invoice.status === 'pending');

  if (overdueInvoices.length === 0) {
      console.log('No overdue invoices found');
      return;
  }

  for (const invoice of overdueInvoices) {
      try {
          await sendEmail(invoice.email, 'Invoice Due Reminder', 'invoiceReminder', invoice);
          console.log(`Reminder email sent for invoice ${invoice.id}`);
          invoice.status = 'reminder_sent'; 
      } catch (error) {
          console.error('Error sending reminder email:', error);
      }
  }
};

schedule.scheduleJob('0 9 * * *', () => {
  console.log('Running daily invoice reminder check...');
  checkOverdueInvoicesAndSendReminders();
});

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Routes
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:3000/invoices');
  }
);
app.get('/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});


app.get('/invoices', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send('Not authenticated');
  }
  
  res.json(invoices);
});


app.post('/zapier/trigger', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send('Not authenticated');
  }

  const currentDate = new Date();
  const overdueInvoices = invoices.filter(invoice => new Date(invoice.dueDate) < currentDate);

  if (overdueInvoices.length === 0) {
    return res.send('No overdue invoices found');
  }

  try {
    
    const zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/19190030/2o0cyac/';

    for (const invoice of overdueInvoices) {
      await axios.post(zapierWebhookUrl, {
        invoiceId: invoice.id,
        amount: invoice.amount,
        dueDate: invoice.dueDate,
        recipient: invoice.recipient,
        email: invoice.email
      });
    }

    res.send(`Zapier trigger executed for ${overdueInvoices.length} overdue invoices`);
  } catch (error) {
    console.error('Error triggering Zapier:', error);
    res.status(500).send('Error triggering Zapier workflow');
  }
});

app.post('/schedule', (req, res) => {
  const { invoiceId, date } = req.body;
  scheduleAutomation(invoiceId, new Date(date), async (invoiceId) => {
      
      const invoice = invoices.find(inv => inv.id === invoiceId);
      if (invoice) {
          await sendEmail(invoice.email, 'Scheduled Invoice Reminder', 'invoiceReminder', invoice);
          updateInvoiceStatus(invoiceId, 'reminder_scheduled');
      }
  });
  res.send('Action scheduled');
});

app.post('/customize-email', (req, res) => {
  const { invoiceId, subject, template } = req.body;
  const invoice = invoices.find(inv => inv.id === invoiceId);
  if (invoice) {
      sendEmail(invoice.email, subject, template, invoice).then(() => {
          updateInvoiceStatus(invoiceId, 'custom_email_sent');
          res.send('Custom email sent');
      }).catch(error => {
          console.error('Error sending custom email:', error);
          res.status(500).send('Error sending custom email');
      });
  } else {
      res.status(404).send('Invoice not found');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
