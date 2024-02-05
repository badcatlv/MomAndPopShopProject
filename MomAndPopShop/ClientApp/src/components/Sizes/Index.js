// eslint-disable-next-line
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Sizes = () => {

    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('sizes')
            .then((results) => results.json())
            .then(data => {
                console.log(data);
                setSizes(data);
            })
            .catch(error => {
                console.error('Error fetching sizes data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <main>
            <div className="text-center">
                <h1 className="display-4">Size List</h1>

                {loading && <p>Loading...</p>}

                {sizes && sizes.length > 0 && (
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
                            {sizes.map((sizesItem) => (
                                <tr key={sizesItem.id}>
                                    <td>{sizesItem.name}</td>
                                    <td>{sizesItem.description}</td>
                                    <td>{sizesItem.sizePrice}</td>
                                    <td>{sizesItem.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {sizes && sizes.length === 0 && !loading && (
                    <p>No items in inventory yet!</p>
                )}

                <p><Link to="/sizes/create">Create Size Item</Link></p>
                <p><Link to="/sizes/delete">Delete Size Item</Link></p>
                <p><Link to="/sizes/edit">Edit Size Item</Link></p>

            </div>
        </main>
    );
};

export default Sizes;