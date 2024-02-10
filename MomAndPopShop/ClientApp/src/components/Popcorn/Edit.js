import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        PopcornPrice: 0,
        Quantity: 0
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/popcorn/edit/${id}`);
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
            const response = await fetch(`/popcorn/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Popcorn item updated successfully');
                navigate('/popcorn');
            } else {
                if (response.status === 400) {
                    console.error('Bad request - check your input data');
                } else if (response.status === 401) {
                    console.error('Unauthorized - check your authentication');
                } else {
                    console.error('Error updating popcorn item');
                }
            }
        } catch (error) {
            console.error('Error:', error);
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

                <input type="submit" value="Save Changes" />
            </form>
        </div>
    );
};

export default Edit;
