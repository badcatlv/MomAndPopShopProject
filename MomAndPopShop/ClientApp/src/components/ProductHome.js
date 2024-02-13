import { useEffect, useState } from 'react';

const ProductHome = () => {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProductData();
    }, []);

    const fetchProductData = () => {
        fetch('producthome')
            .then((results) => {
                if (!results.ok) {
                    throw new Error("Error fetching products.");
                }
                return results.json();
            })
            .then(data => {
                console.log(data);
                setProducts(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError("Error fetching products, please try again later.")
                setIsLoading(false);
                console.error("Error fetching products: ", error);
            });

    };

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', async (event) => {
            const productId = event.target.dataset.productId;
            const quantityInput = document.getElementById(`quantity-${productId}`);
            const quantity = quantityInput.value;

            const response = await fetch(`/Cart/AddToCart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId, quantity })
            });

            if (response.ok) {
                const cart = await response.json();
                if (cart.updated) {
                    alert('Product quantity updated in cart');
                } else {
                    alert('Product added to cart');
                }
            } else {
                alert('Failed to add product to cart');
            }
        });
    });

    const addToCart = (product) => {
        console.log("Add to cart: ", product);
    }

    const handleAddToCart = (id) => {
        fetch(`cart/${id}`, { method: 'POST' })
            .then(results => {
                if (!results) {
                    throw new Error("Cannot add item to cart.");
                }
                fetchProductData();
            })
            .catch(error => {
                console.error("Error adding item to cart: ", error);
            });
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>
    }
    return (
        <div>
            <h2>Products</h2>
            {(products.length > 0) ? products.map(product => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>${product.popcornPrice}</p>
                    <p>{product.quantity}</p>
                    <button class="add-to-cart" data-product-id={product.id }>Add to Cart</button>
                </div>
            )) : <div>No products found.</div>}
        </div>
    );
};
export default ProductHome;