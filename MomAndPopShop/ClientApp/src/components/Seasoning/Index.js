// eslint-disable-next-line
import { useEffect, useState } from 'react';


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
                                    <td>{seasoningItem.Name}</td>
                                    <td>{seasoningItem.Description}</td>
                                    <td>{seasoningItem.PopcornPrice}</td>
                                    <td>{seasoningItem.Quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {seasoning.length === 0 && !loading && (
                    <p>No items in inventory yet!</p>
                )}
            </div>
        </main>
    );
};

export default Seasoning;

