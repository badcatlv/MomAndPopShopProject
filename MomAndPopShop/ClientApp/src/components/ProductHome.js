import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const ProductHome = () => {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [form, setForm] = useState({
        popcornId: id,
        quantity: 1
    });


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

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setForm({
            ...form,
            [name]: value
        });
    }

    const handleAddToCart = async () => {

        try {
            const response = await fetch(`/cart/addtocart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
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
        }
        catch (error) {
            console.error('Error adding product to cart: ', error);
        }
    };

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
                    <form onSubmit={() => handleAddToCart(id, quantity)}>
                        <input type="number" name="quantity" value={form.quantity} onChange={handleInputChange} />
                        <input type="hidden" name="popcornId" value={product.id} />
                    <button type="submit">Add to Cart</button>
                        
                    </form>
                </div>
            )) : <div>No products found.</div>}
            <div>
                <p><Link to="/cart">Show Cart</Link></p>
            </div>

        </div>
    );
};
export default ProductHome;