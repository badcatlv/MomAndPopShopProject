// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ContactForm = () => {
    const [contactForm, setContactForm] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/contactForm')
            .then((results) => {
                return results.json();
            })
            .then(data => {
                console.log(data);
                setContactForm(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <main>
            <div className="text-center">
                <h1 className="display-4">Contact Form Submissions</h1>

                {loading && <p>Loading...</p>}

                {contactForm.length > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contactForm.map((formItem) => (
                                <tr key={formItem.id}>
                                    <td>{formItem.name}</td>
                                    <td>{formItem.email}</td>
                                    <td>{formItem.phoneNumber}</td>
                                    <td>{formItem.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {contactForm.length === 0 && !loading && (
                    <p>No contact form submissions yet!</p>
                )}

                <p><Link to="/contactForm/create">Create Contact Form Submission</Link></p>
            </div>
        </main>
    );
};

export default ContactForm;