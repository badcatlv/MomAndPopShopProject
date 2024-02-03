// eslint-disable-next-line
import { useEffect, useState } from 'react';


const Sizes = () => {

    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('sizes')
            .then((results) => {
                return results.json();
            })
            .then(data => {
                console.log(data);
                setSizes(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <main>
            <div className="text-center">
                <h1 className="display-4">Size List</h1>

                {sizes.length > 0 && (
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
                            {sizes.map((SizesItem) => (
                                <tr key={SizesItem.id}>
                                    <td>{SizesItem.Name}</td>
                                    <td>{SizesItem.Description}</td>
                                    <td>{SizesItem.PopcornPrice}</td>
                                    <td>{SizesItem.Quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {sizes.length === 0 && !loading && (
                    <p>No items in inventory yet!</p>
                )}
            </div>
        </main>
    );
};

export default Sizes;

