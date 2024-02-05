import { useEffect, useState } from 'react';


const CartItems = () => {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCartData();
    }, []);

    const fetchCartData = () => {
        fetch('cart')
            .then((results) => {
                return results.json();
            })
            .then(data => {
                console.log(data);
                setCartItems(data);
            })
    }

    const handleDelete = (id) => {
        fetch(`cart/${id}`, { method: 'DELETE' })
            .then(() => {

                fetchCartData();

            })
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
            )) : <p>loading......</p>}
        </div>
    );
}
export default CartItems;