import { useEffect, useState } from 'react';


const CartItems = () => {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetch('cartitem')
            .then((results) => {
                return results.json();
            })
            .then(data => {
                console.log(data);
                setCartItems(data);
            })
    }, []);

    return (
        <main>
            {
                (cartItems.length > 0) ? cartItems.map((cartItem) => <h3>{cartItem.popcornName}</h3>) : <div>Loading...</div>
                                //cartItems.map((cartItem) => <h3>{cartItem.popcornName}</h3>)

            }
        </main>
    )
}

export default CartItems;
