import React, { useState, useEffect } from "react";
import "./StripeApp.css";
import Cart from "../Cart";
import SaveCartToDb from "../SaveCartToDb";

const handleClearCart = () => {
    fetch('cart/clear', { method: 'POST' })
        .then(results => {
            if (!results) {
                throw new Error("Cannot clear cart.");
            }
            refreshPage();
        })
        .catch(error => {
            console.error("Error clearing cart: ", error);
        });
}

const handleSaveCart = () => {
    fetch('cart/savecart', { method: 'POST' })
        .then(results => {
            if (!results) {
                throw new Error("Cannot save cart.");
            }
            refreshPage();
        })
        .catch(error => {
            console.error("Error saving cart: ", error);
        });
}


const refreshPage = () => {
    window.location.reload(false);
}

const ProductDisplay = () => (
    <>

        <Cart />

        <div className="center">
            <form action="/create-checkout-session" method="POST">
                <button className="stripeButton" type="submit">
                    Checkout
                </button>
            </form>
            <br />
            <form onSubmit={handleClearCart}>
                <button className="stripeButton" type="submit">Clear Cart</button>
            </form>
            <br />
            <a href="/product-home">
                <button className="stripeButton">Keep Shopping</button>
            </a>
            <br />
            <br />
            <form onSubmit={handleSaveCart}>
                <button className="stripeButton" type="submit">Save Cart</button>
            </form>
            <br/>
            <SaveCartToDb />
        </div>
    </>
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