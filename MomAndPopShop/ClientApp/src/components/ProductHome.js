import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CartDisplay from './CartDisplay';


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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>
    }
    return (
        <div>
            <h2>Products</h2>
            
            <hr />
            {(products.length > 0) ? products.map(product => (
                <CartDisplay product={product} key={ product.id } />
            )) : <div>No products found.</div>}
            <div>
                <p><Link to="/cart">Show Cart</Link></p>
            </div>

        </div>
    );
};
export default ProductHome;