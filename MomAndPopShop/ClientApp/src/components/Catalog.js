import React from "react";
//import "./style.css";
import "../custom.css";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Catalog = () => {

    const [popcorn, setPopcorn] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    <div class="product">
                        <div class="product-image"></div>
                        <div class="product-info">
                            <h2 class="product-title">{popcornItem.name}</h2>
                            <p class="product-description">{popcornItem.description}</p>
                            <p class="product-price">{popcornItem.popcornPrice}</p>
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

    