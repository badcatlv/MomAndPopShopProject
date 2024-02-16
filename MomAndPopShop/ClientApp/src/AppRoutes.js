import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import CartItems from './components/CartItems';
import Packaging from './components/Packaging/Index';
import CreatePackaging from './components/Packaging/Create';
import EditPackaging from './components/Packaging/Edit';
import DeletePackaging from './components/Packaging/Delete';
import Popcorn from './components/Popcorn/Index';
import CreatePopcorn from './components/Popcorn/Create';
import EditPopcorn from './components/Popcorn/Edit';
import DeletePopcorn from './components/Popcorn/Delete';
import Products from './components/Products';
import Seasoning from './components/Seasoning/Index';
import CreateSeasoning from './components/Seasoning/Create';
import EditSeasoning from './components/Seasoning/Edit';
import DeleteSeasoning from './components/Seasoning/Delete';
import PopcornSize from './components/PopcornSize/Index';
import CreatePopcornSize from './components/PopcornSize/Create';
import EditPopcornSize from './components/PopcornSize/Edit';
import DeletePopcornSize from './components/PopcornSize/Delete';


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
        path: '/packaging/create',
        element: <CreatePackaging />
    },
    {
        path: '/packaging/edit/:id',
        element: <EditPackaging />
    },
    {
        path: '/packaging/delete/:id',
        element: <DeletePackaging />
    },
    {
        path: '/popcorn',
        element: <Popcorn />
    },
    {
        path: '/popcorn/create',
        element: <CreatePopcorn />
    },
    {
        path: '/popcorn/edit/:id',
        element: <EditPopcorn />
    },
    {
        path: '/popcorn/delete/:id',
        element: <DeletePopcorn />
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
        path: '/seasoning/create',
        element: <CreateSeasoning />
    },
    {
        path: '/seasoning/edit/:id',
        element: <EditSeasoning />
    },
    {
        path: '/seasoning/delete/:id',
        element: <DeleteSeasoning />
    },
    {
        path: '/popcornSize',
        element: <PopcornSize />
    },
    {
        path: '/popcornSize/create',
        element: <CreatePopcornSize />
    },
    {
        path: '/popcornSize/edit/:id',
        element: <EditPopcornSize />
    },
    {
        path: '/popcornSize/delete/:id',
        element: <DeletePopcornSize />
    },
    ...ApiAuthorzationRoutes
];

export default AppRoutes;
