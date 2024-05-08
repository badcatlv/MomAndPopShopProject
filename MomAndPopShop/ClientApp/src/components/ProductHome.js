import { useEffect, useState } from 'react';
import CartDisplay from './CartDisplay';
import SeasoningDisplay from './SeasoningDisplay';


const ProductHome = () => {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [seasonings, setSeasonings] = useState([]);
    const [error, setError] = useState(null);
   


    /*useEffect(() => {
        fetchProductData();
    }, []);*/

    useEffect(() => {
        fetchProductData();
        fetchSeasoningData();
    }, []);
 

    const fetchProductData = () => {
        fetch('/producthome/popcorn')
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


    const fetchSeasoningData = () => {
        fetch('/producthome/seasoning')
            .then((results) => {
                if (!results.ok) {
                    throw new Error("Error fetching seasonings.");
                }
                return results.json();
            })
            .then(data => {
                console.log(data);
                setSeasonings(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError("Error fetching seasonings, please try again later.")
                setIsLoading(false);
                console.error("Error fetching seasonings: ", error);
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

            <h2>Seasonings</h2>
            <hr />
            {(seasonings.length > 0) ? seasonings.map(seasoning => (
                <SeasoningDisplay seasoning={seasoning} key={seasoning.id} />
            )) : <div className="center">No seasonings found.</div>}

        </div>
    );
};
export default ProductHome;