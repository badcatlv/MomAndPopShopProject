import React from "react";
//import "./style.css";
import "../custom.css";

export const Catalog = () => {
    return (
        <div className="product-page">
            <div className="div">
                <div className="page-heading">
                    <div className="default-chip">
                        <div className="text-wrapper">Default</div>
                    </div>
                    <div className="a-z-chip">
                        <div className="text-wrapper-2">A-Z</div>
                    </div>
                    <div className="list-chip">
                        <div className="text-wrapper-2">List view</div>
                    </div>
                    <p className="fresh-august">
                        <span className="span">Fresh</span>
                        <span className="text-wrapper-3">&nbsp;&nbsp;—&nbsp;&nbsp;August 21, 2023</span>
                    </p>
                    <div className="text-wrapper-4">Produce</div>
                    <img className="divider" alt="Divider" src="divider.svg" />
                </div>
                <div className="navigation">
                    <div className="text-wrapper-5">World Peas</div>
                    <div className="text-wrapper-6">Shop</div>
                    <div className="text-wrapper-7">Newstand</div>
                    <div className="text-wrapper-8">Who we are</div>
                    <div className="text-wrapper-9">My profile</div>
                    <div className="cart-button">
                        <div className="text-wrapper-10">Basket (3)</div>
                    </div>
                </div>
                <div className="tomato">
                    <div className="text-wrapper-11">Heirloom tomato</div>
                    <div className="text-wrapper-12">$5.99 / lb</div>
                    <p className="p">Grown in San Juan Capistrano, CA</p>
                    <img className="img" alt="Ed o neil" src= "${combined_path}" />
                </div>
                <div className="ginger">
                    <div className="text-wrapper-11">Organic ginger</div>
                    <div className="text-wrapper-12">$12.99 / lb</div>
                    <p className="p">Grown in Huntington Beach, CA</p>
                    <img className="img" alt="Noonbrew ekmak" src="Assets\\yellowpopcorn.png" />
                </div>
            </div>
        </div>
    );
};
