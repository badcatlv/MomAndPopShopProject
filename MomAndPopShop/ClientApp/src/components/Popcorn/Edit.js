import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        popcornPrice: 0,
        quantity: 0,
        id: 0
    });

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
        const { value } = event.target;
        const newData = {
            ...formData
        }
        if (event.target.name === 'PopcornPrice') {
            newData.popcornPrice = value;
        }
        if (event.target.name === 'Quantity') {
            newData.quantity = value;
        }
        if (event.target.name === 'Name') {
            newData.name = value;
        }
        if (event.target.name === 'Description') {
            newData.description = value;
        }

        setFormData(newData);
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
                setIsError(false);
                navigate('/popcorn');
            } else {
                if (response.status === 400) {
                    console.error('Bad request - check your input data');
                    setIsError(true);
                    setErrorMessage('Bad request - check your input data');
                } else if (response.status === 401) {
                    console.error('Unauthorized - check your authentication');
                    setIsError(true);
                    setErrorMessage('Unauthorized - check your authentication');
                } else {
                    console.error('Error updating popcorn item');
                    setIsError(true);
                    setErrorMessage("Unhandled exception encountered while updating popcorn item.")
                }
            }

        } catch (error) {
            console.error('Error:', error);
            setIsError(true);
            setErrorMessage(`Unhandled exception encountered while updating popcorn item. ${error.message}`)
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
                        value={formData.name}
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
                        value={formData.description}
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
                        value={formData.popcornPrice}
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
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <input type="submit" value="Save Changes" />
            </form>
            {isError && <p>{errorMessage}</p>}
        </div>

    );
};

export default Edit;