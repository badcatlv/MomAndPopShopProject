import { useEffect, useState } from 'react';


const CartItems = () => {

    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCartData();
    }, []);

    const fetchCartData = () => {
        fetch('cart')
            .then((results) => {
                if (!results.ok) {
                    throw new Error("Error fetching cart items.");
                }
                return results.json();
            })
            .then(data => {
                console.log(data);
                setCartItems(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError("Error fetching cart items, please try again later.")
                setIsLoading(false);
                console.error("Error fetching cart items: ", error);
            });

    };

    const handleDelete = (id) => {
        fetch(`cart/${id}`, { method: 'DELETE' })
            .then(results => {
                if (!results) {
                    throw new Error("Cannot delete item.");
                }
                fetchCartData();
            })
            .catch(error => {
                console.error("Error deleting item: ", error);
            });
    };

    

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>
    }
    return (
        <div>
            <h2>Cart</h2>
            {(cartItems.length > 0) ? cartItems.map(item => (
                <table>
                    <tr>
                        <th>Name</th>
                    </tr>
                    <tr>
                        <td key={item.id}>
                            {item.popcornName}    <br></br>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                    </tr>
                </table>
            )) : <p>Cart is currently empty</p>}
        </div>
    );
}
export default CartItems;