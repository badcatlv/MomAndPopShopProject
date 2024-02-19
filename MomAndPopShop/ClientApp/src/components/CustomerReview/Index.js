// eslint-disable-next-line
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CustomerReview = () => {
    const [customerReview, setCustomerReview] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/customerReview') 
            .then((results) => {
                return results.json();
            })
            .then(data => {
                console.log(data);
                setCustomerReview(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <main>
            <div className="text-center">
                <h1 className="display-4">Customer Reviews</h1>

                {customerReview.length > 0 && (
                    <table className="table">
                        <tbody>
                            {customerReview.map((customerReviewItem) => (
                                <tr key={customerReviewItem.id}>
                                    <td>{customerReviewItem.review}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {customerReview.length === 0 && !loading && (
                    <p>No Reviews yet!</p>
                )}

                <p><Link to="/customerReview/create">Add a Customer Review</Link></p>
            </div>
        </main>
    );
};

export default CustomerReview;