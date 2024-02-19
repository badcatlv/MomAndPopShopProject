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

    const productCard = data => (
        <div className="card">
            <img src={data.imageSrc} className="card-img-top rounded-circle" />
            <img class="product-image" src={defaultImageSrc} alt={data.name} />
            <div class="product-info">
                <h2 class="product-title">{data.name}</h2>
                <p class="product-description">{data.description}</p>
                <p class="price">${data.popcornPrice}</p>
                <p><button>Add to Cart</button></p>
            </div>
        </div>
    )


    return (

        <main>
         
            {popcorn.length === 0 && !loading && (
                <p>No items in inventory yet!</p>
            )}

            {popcorn.length > 0 && (
            <table>
                <tbody>
                    {
                        //tr > 3 td
                        [...Array(Math.ceil(popcorn.length / 4))].map((e, i) =>
                            <tr key={i}>
                                <td>{productCard(popcorn[4 * i])}</td>
                                <td>{popcorn[4 * i + 1] ? productCard(popcorn[4 * i + 1]) : null}</td>
                                <td>{popcorn[4 * i + 2] ? productCard(popcorn[4 * i + 2]) : null}</td>
                                <td>{popcorn[4 * i + 3] ? productCard(popcorn[4 * i + 3]) : null}</td>
                            </tr>
                        )
                    }
                </tbody>
                </table>
            )}

        </main>
    )
};

export default Catalog;

    