import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { Home } from "./components/Home";
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
import Cart from './components/Cart';
import CartDisplay from './components/CartDisplay';
import ProductHome from './components/ProductHome';
import ManageRentalEvent from './components/RentalEvent/Manage';
import RequestRentalEvent from './components/RentalEvent/Request';
import Catalog from './components/Catalog';
import CustomerReview from './components/CustomerReview/Index';
import CreateCustomerReview from './components/CustomerReview/Create';
import ContactForm from './components/ContactForm/Index';
import CreateContactForm from './components/ContactForm/Create';
import StripeApp from './components/Stripe/StripeApp';
import SuccessfulCheckoutPage from './components/Stripe/Successful';

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
        path: '/cart',
        element: <Cart />
    },
    {
        path: '/cart-display',
        element: <CartDisplay />
    },
    {
        path: '/product-home',
        element: <ProductHome />
    },
    {
        path: '/stripe-app',
        element: <StripeApp />
    },
    {
        path: '/rentalevent/manage',
        requireAuth: true,
        element: <ManageRentalEvent />
    },
    {
        path: '/rentalevent/request',
        element: <RequestRentalEvent />
    },
    {
        path: '/catalog',
        requireAuth: true,
        element: <Catalog />
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
    {
        path: '/customerReview',
        element: <CustomerReview />
    },
    {
        path: '/customerReview/create',
        element: <CreateCustomerReview />
    },
    {
        path: '/contactForm',
        element: <ContactForm />
    },
    {
        path: '/contactForm/create',
        element: <CreateContactForm />
    },
    {
        path: '/successful',
        element: <SuccessfulCheckoutPage />
    },
    ...ApiAuthorzationRoutes
];

export default AppRoutes;
