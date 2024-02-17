// eslint-disable-next-line
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Products extends Component {
    static displayName = 'Products';

    render() {
        return (
            <div>
                <h1>Products Available</h1>
                <br />

                <div>
                    <h3>Seasoning</h3>
                    <Link to="/seasoning">View Seasoning Inventory</Link>
                </div>
                <br />

                <div>
                    <h3>Popcorn</h3>
                    <Link to="/popcorn">View Popcorn Inventory</Link>
                </div>
                <br />

                <div>
                    <h3>Size</h3>
                    <Link to="/popcornSize">View Size Inventory</Link>
                </div>
                <br />

                <div>
                    <h3>Packaging</h3>
                    <Link to="/packaging">View Packaging Inventory</Link>
                </div>
                <br />
            </div>
        );
    }
}

export default Products;
