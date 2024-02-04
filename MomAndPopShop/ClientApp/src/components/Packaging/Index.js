// eslint-disable-next-line
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



const Packaging = () => {

    const [packaging, setPackaging] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('packaging')
            .then((results) => {
                return results.json();
            })
            .then(data => {
                console.log(data);
                setPackaging(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <main>
            <div className="text-center">
                <h1 className="display-4">Packaging List</h1>

                {packaging.length > 0 && (
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
                                    <td>{packagingItem.Name}</td>
                                    <td>{packagingItem.Description}</td>
                                    <td>{packagingItem.PopcornPrice}</td>
                                    <td>{packagingItem.Quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {packaging.length === 0 && !loading && (
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

