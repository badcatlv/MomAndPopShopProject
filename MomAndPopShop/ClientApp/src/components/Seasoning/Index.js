// eslint-disable-next-line
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SeasongingDisplay from '../SeasoningDisplay';

const Seasoning = () => {

    const [seasoning, setSeasoning] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('seasoning')
            .then((results) => {
                return results.json();
            })
            .then(data => {
                console.log(data);
                setSeasoning(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <main>
            <div className="text-center">
                <h1 className="display-4">Seasoning List</h1>

                {seasoning.length > 0 && (
                    <>
                    < SeasongingDisplay seasoning={seasoning} />
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
                                    <td>
                                        <Link to={`/seasoning/edit/${seasoningItem.id}`}>Edit</Link>
                                        {' | '}
                                        <Link to={`/seasoning/delete/${seasoningItem.id}`}>Delete</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </>
                )}

                {seasoning.length === 0 && !loading && (
                    <p>No items in inventory yet!</p>
                )}

                <p><Link to="/seasoning/create">Create Seasoning Item</Link></p>
            </div>
        </main>
    );
};

export default Seasoning;