import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteSeasoning = () => {
    const { id } = useParams();
    const [seasoning, setSeasoning] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSeasoningData = async () => {
            try {
                const response = await fetch(`/seasoning/${id}`);
                if (response.ok) {
                    const seasoningData = await response.json();
                    setSeasoning(seasoningData);
                } else {
                    console.error('Error fetching seasoning data for deletion');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSeasoningData();
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`/seasoning/delete/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Seasoning item deleted successfully');
                navigate('/seasoning');
            } else {
                if (response.status === 404) {
                    console.error('Seasoning item not found');
                } else {
                    console.error('Error deleting seasoning item');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Delete Seasoning Item</h2>
            {loading && <p>Loading...</p>}
            {seasoning && !loading && (
                <div>
                    <p>Are you sure you want to delete the seasoning item with ID: {id}?</p>
                    <p>Name: {seasoning.name}</p>
                    <p>Description: {seasoning.description}</p>
                    <p>SeasoningPrice: {seasoning.seasoningPrice}</p>
                    <p>Quantity: {seasoning.quantity}</p>

                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default DeleteSeasoning;