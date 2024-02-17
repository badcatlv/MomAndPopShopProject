import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { validateField } from './Create.js';  

const Edit = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        popcornPrice: 0,
        quantity: 0,
        id: 0
    });

    const [validationErrors, setValidationErrors] = useState({
        name: '',
        description: '',
        popcornPrice: '',
        quantity: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/popcorn/${id}`);
                if (response.ok) {
                    const existingPopcorn = await response.json();
                    setFormData(existingPopcorn);
                } else {
                    console.error('Error fetching popcorn data for editing');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const errorMessage = validateField(name, value);

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
            const response = await fetch(`/popcorn/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Popcorn item updated successfully');
                setIsLoading(false);
                navigate('/popcorn');
            } else {
                if (response.status === 400) {
                    console.error('Bad request - check your input data');
                    setIsLoading(false);
                    setValidationErrors({
                        name: 'Invalid input data',
                        description: 'Invalid input data',
                        popcornPrice: 'Invalid input data',
                        quantity: 'Invalid input data'
                    });
                } else if (response.status === 401) {
                    console.error('Unauthorized - check your authentication');
                    setIsLoading(false);
                    setValidationErrors({
                        name: 'Unauthorized',
                        description: 'Unauthorized',
                        popcornPrice: 'Unauthorized',
                        quantity: 'Unauthorized'
                    });
                } else {
                    console.error('Error updating popcorn item');
                    setIsLoading(false);
                    setValidationErrors({
                        name: 'Unhandled exception',
                        description: 'Unhandled exception',
                        popcornPrice: 'Unhandled exception',
                        quantity: 'Unhandled exception'
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
            setValidationErrors({
                name: `Unhandled exception: ${error.message}`,
                description: `Unhandled exception: ${error.message}`,
                popcornPrice: `Unhandled exception: ${error.message}`,
                quantity: `Unhandled exception: ${error.message}`
            });
        }
    };

    return (
        <div>
            <h2>Edit Popcorn Item</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Name">Popcorn Name</label>
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
                    <label htmlFor="Description">Popcorn Description</label>
                    <input
                        type="text"
                        id="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    <span className="error-message">{validationErrors.description}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="PopcornPrice">Popcorn Price</label>
                    <input
                        type="number"
                        id="PopcornPrice"
                        name="popcornPrice"
                        value={formData.popcornPrice}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    <span className="error-message">{validationErrors.popcornPrice}</span>
                </div>

                <div className="form-group">
                    <label htmlFor="Quantity">Popcorn InStock Quantity</label>
                    <input
                        type="number"
                        id="Quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    <span className="error-message">{validationErrors.quantity}</span>
                </div>

                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <input type="submit" value="Save Changes" />
                )}
            </form>
        </div>
    );
};

export default Edit;