// eslint-disable-next-line
import { useEffect, useState } from 'react';




const Manage = () => {

    const [rentalEvent, setRentalEvent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('rentalEvent')
            .then((results) => {
                return results.json();
            })
            .then(data => {
                console.log(data);
                setRentalEvent(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <main>
            <div className="text-center">
                <h1 className="display-4">Rental Event List</h1>

                {rentalEvent.length > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Description</th>
                                <th>Address</th>
                                <th>Date</th>
                                <th>StartTime</th>
                                <th>EndTime</th>
                                <th>RentalItem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rentalEvent.map((rentalEventItem) => (
                                <tr key={rentalEventItem.id}>
                                    <td>{rentalEventItem.name}</td>
                                    <td>{rentalEventItem.email}</td>
                                    <td>{rentalEventItem.phone}</td>
                                    <td>{rentalEventItem.description}</td>
                                    <td>{rentalEventItem.address}</td>
                                    <td>{rentalEventItem.date}</td>
                                    <td>{rentalEventItem.startTime}</td>
                                    <td>{rentalEventItem.endTime}</td>
                                    <td>{rentalEventItem.rentalItem}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {rentalEvent.length === 0 && !loading && (
                    <p>No rental events yet!</p>
                )}

            </div>
        </main>
    );
};

export default Manage;