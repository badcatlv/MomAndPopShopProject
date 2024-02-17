import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DeletePopcorn = () => {
    const { id } = useParams();
    const [popcornSize, setPopcornSize] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPopcornSizeData = async () => {
            try {
                const response = await fetch(`/popcornSize/${id}`);
                if (response.ok) {
                    const popcornSizeData = await response.json();
                    setPopcornSize(popcornSizeData);
                } else {
                    console.error('Error fetching popcornSize data for deletion');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPopcornSizeData();
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`/popcornSize/delete/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('PopcornSize item deleted successfully');
                navigate('/popcornSize');
            } else {
                if (response.status === 404) {
                    console.error('PopcornSize item not found');
                } else {
                    console.error('Error deleting popcornSize item');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Delete Size Item</h2>
            {loading && <p>Loading...</p>}
            {popcornSize && !loading && (
                <div>
                    <p>Are you sure you want to delete the Size item with ID: {id}?</p>
                    <p>Name: {popcornSize.name}</p>
                    <p>Description: {popcornSize.description}</p>
                    <p>Size Price: {popcornSize.popcornSizePrice}</p>
                    <p>Quantity: {popcornSize.quantity}</p>

                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default DeletePopcorn;