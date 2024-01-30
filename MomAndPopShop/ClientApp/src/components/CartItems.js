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
                (cartItems > 0) ? cartItems.map((cartItem) => <div>{cartItem.productName}</div>) : <div>Loading...</div>
            }
        </main>
    )
}

export default CartItems;
