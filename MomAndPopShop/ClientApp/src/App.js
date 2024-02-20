import { Route, Routes } from 'react-router-dom';
import React, { Component } from 'react';
import AppRoutes from './AppRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import { Layout } from './components/Layout';


export default class App extends Component {
  static displayName = App.name;

  render() {
      return (
          <>

      <Layout>
        <Routes>

          {AppRoutes.map((route, index) => {
            const { element, requireAuth, ...rest } = route;
            return <Route key={index} {...rest} element={requireAuth ? <AuthorizeRoute {...rest} element={element} /> : element} />;
          })}
            </Routes>
              </Layout>
          <footer>
                  <p class="footer">&copy; 2024 - Mom and Pop's Popcorn Shop</p>
              </footer>
        </>
    );
  }
}
