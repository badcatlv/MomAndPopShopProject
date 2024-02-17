import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DeletePopcorn = () => {
    const { id } = useParams();
    const [popcorn, setPopcorn] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPopcornData = async () => {
            try {
                const response = await fetch(`/popcorn/${id}`);
                if (response.ok) {
                    const popcornData = await response.json();
                    setPopcorn(popcornData);
                } else {
                    console.error('Error fetching popcorn data for deletion');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPopcornData();
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`/popcorn/delete/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Popcorn item deleted successfully');
                navigate('/popcorn');
            } else {
                if (response.status === 404) {
                    console.error('Popcorn item not found');
                } else {
                    console.error('Error deleting popcorn item');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Delete Popcorn Item</h2>
            {loading && <p>Loading...</p>}
            {popcorn && !loading && (
                <div>
                    <p>Are you sure you want to delete the popcorn item with ID: {id}?</p>
                    <p>Name: {popcorn.name}</p>
                    <p>Description: {popcorn.description}</p>
                    <p>PopcornPrice: {popcorn.popcornPrice}</p>
                    <p>Quantity: {popcorn.quantity}</p>

                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default DeletePopcorn;