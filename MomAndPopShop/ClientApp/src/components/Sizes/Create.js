// Create.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        SizePrice: 0,
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
            const response = await fetch('/sizes/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Size item created successfully');
                navigate('/sizes');
            } else {
                console.error('Error creating size item');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div>
            <h2>Create Size Item</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Name">Size Name</label>
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
                    <label htmlFor="Description">Size Description</label>
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
                    <label htmlFor="SizePrice">Size Price</label>
                    <input
                        type="number"
                        id="SizePrice"
                        name="SizePrice"
                        value={formData.SizePrice}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Quantity">Size InStock Quantity</label>
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