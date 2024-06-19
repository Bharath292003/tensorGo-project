import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/invoice.css';

const Invoices = () => {
    const [invoices, setInvoices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/invoices', { withCredentials: true })
            .then(response => setInvoices(response.data))
            .catch(error => console.error('Error fetching invoices:', error));
    }, []);

    const scheduleAction = (invoiceId) => {
        const date = new Date(prompt('Enter date and time for the action (YYYY-MM-DDTHH:MM:SS):'));
        axios.post('http://localhost:5000/schedule', { invoiceId, date }, { withCredentials: true })
            .then(response => console.log(response.data))
            .catch(error => console.error('Error scheduling action:', error));
    };

    const customizeEmail = (invoiceId) => {
        const subject = prompt('Enter email subject:');
        const template = prompt('Enter email template name:');
        axios.post('http://localhost:5000/customize-email', { invoiceId, subject, template }, { withCredentials: true })
            .then(response => console.log(response.data))
            .catch(error => console.error('Error customizing email:', error));
    };

    const triggerAutomation = () => {
        axios.post('http://localhost:5000/zapier/trigger', {}, { withCredentials: true })
            .then(response => console.log(response.data))
            .catch(error => console.error('Error triggering automation:', error));
    };

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:5000/auth/logout', { withCredentials: true });
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="wrapper">
            <h1>Due Invoices</h1>
            <ul>
                {invoices.map(invoice => (
                    <li className="list-wrapper" key={invoice.id}>
                        {invoice.recipient}: ${invoice.amount} due on {invoice.dueDate} (Status: {invoice.status})
                        <button style={{margin: "10px", padding: "10px", color: "white", background: "#2f5b8b", border: "none", borderRadius: "8px" }}
                          onClick={() => scheduleAction(invoice.id)}>
                            Schedule Action
                        </button>
                        <button className='email-btn'
                        onClick={() => customizeEmail(invoice.id)}>Customize Email</button>
                    </li>
                ))}
            </ul>
            <button style={{margin: "10px", padding: "10px", color: "white", background: "#28AB1E", border: "none", borderRadius: "8px" }}
              onClick={triggerAutomation}>Trigger Email</button>
            <button style={{margin: "10px", padding: "10px", color: "#28AB1E", background: "white", borderColor: "#28AB1E", borderWidth: "1px", borderRadius: "8px", borderStyle: "solid" }}
              onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Invoices;
