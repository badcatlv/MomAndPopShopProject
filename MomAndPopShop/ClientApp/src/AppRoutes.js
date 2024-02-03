import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import CartItems from './components/CartItems';
import Packaging from './components/Packaging/Index';
import Popcorn from './components/Popcorn/Index';
import Products from './components/Products';
import Seasoning from './components/Seasoning/Index';
import Sizes from './components/Sizes/Index';

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        requireAuth: true,
        element: <FetchData />
    },
    {
        path: '/cart-items',
        element: <CartItems />
    },
    {
        path: '/packaging',
        element: <Packaging />
    },
    {
        path: '/popcorn',
        element: <Popcorn />
    },
    {
        path: '/products',
        element: <Products />
    },
    {
        path: '/seasoning',
        element: <Seasoning />
    },
    {
        path: '/sizes',
        element: <Sizes />
    },
    ...ApiAuthorzationRoutes
];

export default AppRoutes;
