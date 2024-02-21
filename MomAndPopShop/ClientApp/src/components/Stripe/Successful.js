import React from 'react';
import './StripeApp.css';

const SuccessfulCheckoutPage = () => {
    return (
        <div className="successful-checkout-container">
            <h2>Thank you for your purchase!</h2>
            <p>Your order has been successfully placed.</p>
            <p>We will send you a confirmation email shortly.</p>
            <br />
            <div>
            <a href="/product-home">
                <button className="stripeButton">Keep Shopping</button>
                </a>
            </div>
            <br />
            <div>
            <a href="/">
                <button className="stripeButton">Home Page</button>
            </a>
            </div>
        </div>
    );
}

export default SuccessfulCheckoutPage;