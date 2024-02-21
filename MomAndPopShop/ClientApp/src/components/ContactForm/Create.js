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
        <main>

        <div>

            <div class="row">
                <div class="left">
                    <h3>Phone</h3>
                    <p>314-867-5309</p>
                    <h3>Address</h3>
                    <p>1457 Bass Pro Drive, St Charles, MO 63301</p>
                    <h3>Email</h3>
                    <p>mom.and.popcorn.shop@gmail.com</p>
                    <h3>Hours</h3>
                    <p>Monday-Thursday: 9:30-5:30</p>
                    <p>Friday-Sunday: 10:00-9:00</p>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199081.7287498216!2d-90.78758239746095!3d38.77168479777255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87df2f489f7f7655%3A0x85d0e06398007cb2!2sPop%20Pop%20Hurray*21%20Gourmet%20Popcorn!5e0!3m2!1sen!2sus!4v1708377809800!5m2!1sen!2sus" width="400" height="300" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div class="right">
                    <h2>Contact Us!</h2>

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
            </div>
            </div>
        </main>
    );
};

export default CreateContactForm;