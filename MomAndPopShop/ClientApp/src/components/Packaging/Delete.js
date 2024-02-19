import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DeletePackaging = () => {
    const { id } = useParams();
    const [packaging, setPackaging] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPackagingData = async () => {
            try {
                const response = await fetch(`/packaging/${id}`);
                if (response.ok) {
                    const packagingData = await response.json();
                    setPackaging(packagingData);
                } else {
                    console.error('Error fetching packaging data for deletion');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackagingData();
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`/packaging/delete/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Packaging item deleted successfully');
                navigate('/packaging');
            } else {
                if (response.status === 404) {
                    console.error('Packaging item not found');
                } else {
                    console.error('Error deleting packaging item');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Delete Packaging Item</h2>
            {loading && <p>Loading...</p>}
            {packaging && !loading && (
                <div>
                    <p>Are you sure you want to delete the packaging item with ID: {id}?</p>
                    <p>Name: {packaging.name}</p>
                    <p>Description: {packaging.description}</p>
                    <p>PackagingPrice: {packaging.packagingPrice}</p>
                    <p>Quantity: {packaging.quantity}</p>

                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default DeletePackaging;