import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const defaultImageSrc = '/img/defaultPopcorn.png'


    useEffect(() => {
        fetchCartData();
        setIsLoading(false);
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
                setCartItems(data.items);
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


    const cartItemDisplay = cartItems.map(collection => (
        <div>

            <div>

                <div class="card" key={collection.id}>
                    <img class="product-image" src={defaultImageSrc} alt={collection.popcornItem.name} />
                    <div class="product-info">
                        <h2 class="product-title">{collection.popcornItem.name}</h2>
                        <p class="product-description">{collection.popcornItem.description}</p>
                        <p class="price">${collection.cost}</p>


                        <form key={collection.id} onSubmit={() => handleDelete(collection.popcornItem.id)}>
                            <button type="submit">Remove</button>
                        </form>
                    </div>
                </div>
                <br />


            </div>
        </div>
    ));

    const totalCost = cartItems.reduce((total, item) => total + item.cost, 0);
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div >
            <h2>Cart</h2>


            <div className="center">
                {/*            <p>cart items: {JSON.stringify(cartItems)}</p>
*/}            {(cartItems.length > 0 ? cartItemDisplay : <p>Cart is currently empty</p>)}
                <p>Total Quantity: {totalQuantity}</p>
                <p>Total Cost: ${totalCost}</p>
                <p><Link to="/product-home">Go back to Product Home</Link></p>
            </div>

        </div>
    );
}

export default Cart;