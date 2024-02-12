import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import CartItems from './components/CartItems';
import Packaging from './components/Packaging/Index';
import CreatePackaging from './components/Packaging/Create';
//import EditPackaging from './components/Packaging/Edit';
//import DeletePackaging from './components/Packaging/Delete';
import Popcorn from './components/Popcorn/Index';
import CreatePopcorn from './components/Popcorn/Create';
//import EditPopcorn from './components/Popcorn/Edit';
//import DeletePopcorn from './components/Popcorn/Delete';
import Products from './components/Products';
import Seasoning from './components/Seasoning/Index';
import CreateSeasoning from './components/Seasoning/Create';
//import EditSeasoning from './components/Seasoning/Edit';
//import DeleteSeasoning from './components/Seasoning/Delete';
import Sizes from './components/Sizes/Index';
import CreateSizes from './components/Sizes/Create';
import ManageRentalEvent from './components/RentalEvent/Manage';
import RequestRentalEvent from './components/RentalEvent/Request';
//import EditSizes from './components/Sizes/Edit';
//import DeleteSizes from './components/Sizes/Delete';


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
        path: '/rentalevent/manage',
        requireAuth: true,
        element: <ManageRentalEvent />
    },
    {
        path: '/rentalevent/request',
        requireAuth: true,
        element: <RequestRentalEvent />
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
    /*{
        path: '/packaging/edit',
        element: <EditPackaging />
    },
    {
       // path: '/packaging/delete',
     //   element: <DeletePackaging />
    },*/
    {
        path: '/popcorn',
        element: <Popcorn />
    },
    {
        path: '/popcorn/create',
        element: <CreatePopcorn />
    },
    /*{
        path: '/popcorn/edit',
        element: <EditPopcorn />
    },
    {
        path: '/popcorn/delete',
        element: <DeletePopcorn />
    },*/
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
    /*{
        path: '/seasoning/edit',
        element: <EditSeasoning />
    },
    {
        path: '/seasoning/delete',
        element: <DeleteSeasoning />
    },*/
    {
        path: '/sizes',
        element: <Sizes />
    },
    {
        path: '/sizes/create',
        element: <CreateSizes />
    },
    /*{
        path: '/sizes/edit',
        element: <EditSizes />
    },
    {
        path: '/sizes/delete',
        element: <DeleteSizes />
    },*/
    ...ApiAuthorzationRoutes
];

export default AppRoutes;
