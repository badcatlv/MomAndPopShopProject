import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cart, setCart] = useState([]);
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
                setCart(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError("Error fetching cart items, please try again later.")
                setIsLoading(false);
                console.error("Error fetching cart items: ", error);
            });

    };

    const handleDelete = (id) => {
        fetch(`cart/Remove/${id}`, { method: 'DELETE' })
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
            <table className="table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {(cartItems.length > 0) ? cartItems.map(item => (
                        <tr key={item.id}>
                            <td>{item.popcornItem.name}</td>
                            <td>${item.popcornItem.price}</td>
                            <td>{item.quantity}</td>
                            <td>${item.cost}</td>
                            <td>
                                <form onSubmit={() => handleDelete(item.id)}>
                                    <button type="submit">Remove</button>
                                </form>
                            </td>
                        </tr>
                        )) : <tr>There are no items in cart.</tr>
                    }
                </tbody>
                
                <tfoot>
                    <tr>
                        <td colSpan="3">Total</td>
                        <td>${cart.totalCost}</td>
                    </tr>
                </tfoot>
            </table >
            
            <p><Link to="/product-home">Go back to Product Home</Link></p>

        </div>
    );
};

export default Cart;