// eslint-disable-next-line
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Packaging = () => {

    const [packaging, setPackaging] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('packaging')
            .then((results) => results.json())
            .then(data => {
                console.log(data);
                setPackaging(data);
            })
            .catch(error => {
                console.error('Error fetching packaging data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <main>
            <div className="text-center">
                <h1 className="display-4">Packaging List</h1>

                {loading && <p>Loading...</p>}

                {packaging && packaging.length > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {packaging.map((packagingItem) => (
                                <tr key={packagingItem.id}>
                                    <td>{packagingItem.name}</td>
                                    <td>{packagingItem.description}</td>
                                    <td>{packagingItem.packagingPrice}</td>
                                    <td>{packagingItem.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {packaging && packaging.length === 0 && !loading && (
                    <p>No items in inventory yet!</p>
                )}

                <p><Link to="/packaging/create">Create Packaging Item</Link></p>
                <p><Link to="/packaging/delete">Delete Packaging Item</Link></p>
                <p><Link to="/packaging/edit">Edit Packaging Item</Link></p>

            </div>
        </main>
    );
};

export default Packaging;