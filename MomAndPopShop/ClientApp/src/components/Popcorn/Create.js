// Create.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        PopcornPrice: 0,
        Quantity: 0
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/popcorn/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Popcorn item created successfully');
                navigate('/popcorn');
            } else {
                console.error('Error creating popcorn item');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div>
            <h2>Create Popcorn Item</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Name">Popcorn Name</label>
                    <input
                        type="text"
                        id="Name"
                        name="Name"
                        value={formData.Name}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Description">Popcorn Description</label>
                    <input
                        type="text"
                        id="Description"
                        name="Description"
                        value={formData.Description}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="PopcornPrice">Popcorn Price</label>
                    <input
                        type="number"
                        id="PopcornPrice"
                        name="PopcornPrice"
                        value={formData.PopcornPrice}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Quantity">Popcorn InStock Quantity</label>
                    <input
                        type="number"
                        id="Quantity"
                        name="Quantity"
                        value={formData.Quantity}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <input type="submit" value="Add Item" />
            </form>
        </div>
    );
};

export default Create;