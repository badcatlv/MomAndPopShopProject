import { useEffect, useState } from 'react';
import EditQuantity from './EditQuantity';
import './Stripe/StripeApp.css';

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


            <div className="card" key={collection.id}>
                <img className="product-image" src={defaultImageSrc} alt={collection.popcornItem.name} />
                <div className="product-info">
                    <h2 className="product-title">{collection.popcornItem.name}</h2>
                    <p className="product-description">{collection.popcornItem.description}</p>
                    <p className="quantity">Qty buy: {collection.quantity}</p>
                    <p className="price">Price per item: ${collection.popcornItem.popcornPrice}</p>
                    <p className="price">Item Total: ${collection.cost}</p>
                    <br />
                    <EditQuantity product={collection.popcornItem} />
                    <br />


                    <form key={collection.id} onSubmit={() => handleDelete(collection.popcornItem.id)}>
                        <button type="submit">Remove</button>
                    </form>
                </div>
            </div>
            <br />


        </div>
    ));

    const totalCartCost = cartItems.reduce((total, item) => total + item.cost, 0);

    /*const totalCost = cartItems.map(collection => (
        (collection.popcornItem.popcornPrice * collection.quantity).reduce((total, item) => total + item, 0))
        );*/

    /*    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    */

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        
            <div>
                <h2>Cart Items</h2>
                <hr/>
                    {(cartItems.length > 0 ? cartItemDisplay : <p>Cart is currently empty</p>)}

                
                
                    <h3 className="center">Cart Total: ${totalCartCost}</h3>
               
            </div>

        
    );
}

export default Cart;
