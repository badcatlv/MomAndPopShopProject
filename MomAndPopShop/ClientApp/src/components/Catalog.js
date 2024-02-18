import React from "react";
//import "./style.css";
import "../custom.css";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Catalog = () => {

    const [popcorn, setPopcorn] = useState([]);
    const [loading, setLoading] = useState(true);
    const defaultImageSrc = '/img/defaultPopcorn.png'

    useEffect(() => {
        fetch('popcorn')
            .then((results) => {
                return results.json();
            })
            .then(data => {
                console.log(data);
                setPopcorn(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (

        <main>

            {popcorn.length > 0 && (
                popcorn.map((popcornItem) => (
                    <div class="card">
                        <img class="product-image" src={defaultImageSrc} alt={popcornItem.name} />
                        <div class="product-info">
                            <h2 class="product-title">{popcornItem.name}</h2>
                            <p class="product-description">{popcornItem.description}</p>
                            <p class="price">${popcornItem.popcornPrice}</p>
                            <p><button>Add to Cart</button></p>
                        </div>
                    </div>
                ))
            )}

            {popcorn.length === 0 && !loading && (
                <p>No items in inventory yet!</p>
            )}

        </main>
    )
};

export default Catalog;

    