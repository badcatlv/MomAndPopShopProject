// eslint-disable-next-line
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Seasoning = () => {

    const [seasoning, setSeasoning] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('seasoning')
            .then((results) => results.json())
            .then(data => {
                console.log(data);
                setSeasoning(data);
            })
            .catch(error => {
                console.error('Error fetching seasoning data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <main>
            <div className="text-center">
                <h1 className="display-4">Seasoning List</h1>

                {loading && <p>Loading...</p>}

                {seasoning && seasoning.length > 0 && (
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
                            {seasoning.map((seasoningItem) => (
                                <tr key={seasoningItem.id}>
                                    <td>{seasoningItem.name}</td>
                                    <td>{seasoningItem.description}</td>
                                    <td>{seasoningItem.seasoningPrice}</td>
                                    <td>{seasoningItem.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {seasoning && seasoning.length === 0 && !loading && (
                    <p>No items in inventory yet!</p>
                )}

                <p><Link to="/seasoning/create">Create Seasoning Item</Link></p>
                <p><Link to="/seasoning/delete">Delete Seasoning Item</Link></p>
                <p><Link to="/seasoning/edit">Edit Seasoning Item</Link></p>

            </div>
        </main>
    );
};

export default Seasoning;