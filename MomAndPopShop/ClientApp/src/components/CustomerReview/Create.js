import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [formData, setFormData] = useState({
        review: '',
    });

    const [validationError, setValidationError] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const validateField = (name, value) => {
        let errorMessage = '';
        switch (name) {
            case 'review':
                errorMessage = value.trim().length < 3 || value.length > 500 ? 'Review must be between 3 and 500 characters' : '';
                break;
            default:
                break;
        }
        return errorMessage;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setValidationError(validateField(name, value));

        setFormData({
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (validationError) {
            console.error('Validation error:', validationError);
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/customerReview/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Customer review item created successfully');
                navigate('/customerReview');
            } else {
                console.error('Error creating customer review item');
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
            <h2>Create a Customer Review</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <textarea
                        id="Review"
                        name="review"
                        value={formData.review}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    <span className="error-message">{validationError}</span>
                </div>

                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <input type="submit" value="Add Review" />
                )}
            </form>
            </div>
        </main>
    );
};

export default Create;