// eslint-disable-next-line
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PopcornSize = () => {
    const [popcornSize, setPopcornSize] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('popcornSize')
            .then((results) => {
                return results.json();
            })
            .then(data => {
                console.log(data);
                setPopcornSize(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <main>
            <div className="text-center">
                <h1 className="display-4">PopcornSize List</h1>

                {popcornSize.length > 0 && (
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
                            {popcornSize.map((popcornSizeItem) => (
                                <tr key={popcornSizeItem.id}>
                                    <td>{popcornSizeItem.name}</td>
                                    <td>{popcornSizeItem.description}</td>
                                    <td>{popcornSizeItem.popcornSizePrice}</td>
                                    <td>{popcornSizeItem.quantity}</td>
                                    <td>
                                        <Link to={`/popcornSize/edit/${popcornSizeItem.id}`}>Edit</Link>
                                        {' | '}
                                        <Link to={`/popcornSize/delete/${popcornSizeItem.id}`}>Delete</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {popcornSize.length === 0 && !loading && (
                    <p>No items in inventory yet!</p>
                )}

                <p><Link to="/popcornSize/create">Create PopcornSize Item</Link></p>
            </div>
        </main>
    );
};

export default PopcornSize;