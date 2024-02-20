import { useEffect, useState } from 'react';
import CartDisplay from './CartDisplay';


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
            )) : <div className="center">No products found.</div>}

        </div>
    );
};
export default ProductHome;