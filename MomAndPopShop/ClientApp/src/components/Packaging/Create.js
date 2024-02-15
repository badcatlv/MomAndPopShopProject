// Create.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        PackagingPrice: 0,
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
            const response = await fetch('/packaging/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Packaging item created successfully');
                navigate('/packaging');
            } else {
                console.error('Error creating packaging item');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div>
            <h2>Create Packaging Item</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Name">Packaging Name</label>
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
                    <label htmlFor="Description">Packaging Description</label>
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
                    <label htmlFor="PackagingPrice">Packaging Price</label>
                    <input
                        type="number"
                        id="PackagingPrice"
                        name="PackagingPrice"
                        value={formData.PackagingPrice}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Quantity">Packaging InStock Quantity</label>
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