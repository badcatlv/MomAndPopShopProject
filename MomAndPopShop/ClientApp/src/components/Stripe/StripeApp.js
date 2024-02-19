﻿import React, { useState, useEffect } from "react";
import "./StripeApp.css";
import Cart from "../Cart";
import { Link } from "react-router-dom";

const ProductDisplay = () => (
    <div className="center">
        <Cart />
        {/*<img
                className="stripeImage"
                src="https://i.imgur.com/EHyR2nP.png"
                alt="The cover of Stubborn Attachments"
            />
            <div className="stripeDescription">
                <h3 className="stripeHeaders">PopCorn</h3>
                <h5 className="stripeHeaders">$20.00</h5>
            </div>*/}
        <div className="center">
            <form action="/create-checkout-session" method="POST">
                <button className="stripeButton" type="submit">
                    Checkout
                </button>
            </form>
            <br />
            <p><Link to="/product-home">Go back to Product Home</Link></p>
        </div>
    </div>
);

const Message = ({ message }) => (
    <section>
        <p className="stripeP">{message}</p>
    </section>
);

export default function StripeApp() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);

    return message ? (
        <Message message={message} />
    ) : (
        <>
            <ProductDisplay />
            <br />

        </>
    );
}