

const SaveCartToDb = (props) => {

    const saveCart = async () => {
        const cart = props.cart;
        const response = await fetch('cart/savecart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart)
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <button onClick={saveCart}>Save Cart</button>
    );


}
export default SaveCartToDb;