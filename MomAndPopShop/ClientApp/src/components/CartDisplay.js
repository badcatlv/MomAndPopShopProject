import { useState } from "react";

const CartDisplay = ({ product }) => {
    const [qtyToAdd, setQtyToAdd] = useState(1);

    const defaultImageSrc = '/img/defaultPopcorn.png';

    const handleQtyChange = (event) => {
        const target = event.target;
        const value = target.value;
        setQtyToAdd(value);
    }

    const handleAddToCart = async (event) => {
        event.preventDefault();
        const requestBody = {
            popcornId: product.id,
            quantity: qtyToAdd
        }
        try {
            const response = await fetch("/cart/addtocart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const cart = await response.json();
                if (cart.updated) {
                    alert("Product quantity updated in cart");
                    refreshPage();
                } else {
                    alert("Product added to cart");
                    refreshPage();
                }
            } else {
                alert("Failed to add product to cart");
            }
        }
        catch (error) {
            console.error("Error adding product to cart: ", error);
        }
    }
    function refreshPage() {
        window.location.reload(false);
    }


    return (
        <>
            <div class="card">
                <img class="product-image" src={defaultImageSrc} alt={product.name} />
                <div class="product-info">
                    <h2 class="product-title">{product.name}</h2>
                    <p class="product-description">{product.description}</p>
                    <p class="price">${product.popcornPrice}</p>
                    <form onSubmit={handleAddToCart}>
                        <input type="number"
                            min="1"
                        max="100"
                            name="quantity"
                            value={qtyToAdd}
                            onChange={handleQtyChange} />
                        <button type="submit">Add to Cart</button>
                    </form>
                </div>
            </div> <br/>
        </>
    )
}

export default CartDisplay;





/*import { useEffect, useState } from 'react';


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
export default CartItems;*/