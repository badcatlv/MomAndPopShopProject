import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const validateField = (name, value) => {
    let errorMessage = '';
    switch (name) {
        case 'name':
            errorMessage = value.trim().length < 3 || value.length > 50 ? 'Name must be between 3 and 50 characters' : '';
            break;
        case 'email':
            errorMessage = value.trim().length < 3 || value.length > 50 ? 'Email must be between 3 and 50 characters' : '';
            break;
        case 'phoneNumber':
            errorMessage = value.trim().length < 3 || value.length > 20 ? 'Phone Number must be between 3 and 20 characters' : '';
            break;
        case 'message':
            errorMessage = value.trim().length < 3 || value.length > 500 ? 'Message must be between 3 and 500 characters' : '';
            break;
        default:
            break;
    }
    return errorMessage;
};

const CreateContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        message: ''
    });

    const [validationErrors, setValidationErrors] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        message: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        let errorMessage = validateField(name, value);

        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage
        }));

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        for (const key in validationErrors) {
            if (validationErrors[key]) {
                console.error('Validation error:', validationErrors[key]);
                setIsLoading(false);
                return;
            }
        }

        try {
            const response = await fetch('/contactForm/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('ContactForm item created successfully');
                navigate('/contactForm');
            } else {
                console.error('Error creating contactForm item');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Contact Form</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Name">Your Name</label>
                    <input
                        type="text"
                        id="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    <span className="error-message">{validationErrors.name}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="Email">Your Email</label>
                    <input
                        type="text"
                        id="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    <span className="error-message">{validationErrors.email}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="PhoneNumber">Your Phone Number</label>
                    <input
                        type="text"
                        id="PhoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    <span className="error-message">{validationErrors.phoneNumber}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="Message">Your Message</label>
                    <textarea
                        id="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    <span className="error-message">{validationErrors.message}</span>
                </div>

                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <input type="submit" value="Submit" />
                )}
            </form>
        </div>
    );
};

export default CreateContactForm;