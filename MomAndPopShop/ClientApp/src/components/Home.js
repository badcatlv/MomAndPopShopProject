import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductHome from './ProductHome';
export class Home extends Component {
  static displayName = Home.name;

  render() {
      return (
      <main>
      <div>
                  <h1>Welcome to the Mom and Pop Shop!</h1> 
                  <br></br>
                  <h3>We are a small business that sells a variety of products.</h3>
                  <br></br>
                  <p>Please take a look around and let us know if you have any <Link to="./ContactForm/Create">questions</Link>.</p>
              </div>
              <ProductHome />
          </main>
    );
  }
}
