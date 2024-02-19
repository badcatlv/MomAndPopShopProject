import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import authService from './api-authorization/AuthorizeService';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            isAuthenticated: false,
            role: null
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }
    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            role: user && user.role
        });
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        const role = this.state.role;
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                    <NavbarBrand tag={Link} to="/"><img src='/img/nobackground.png' width='200px'/></NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                            </NavItem>
                            {role && role.includes("Admin") ?
                                <span>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark" to="/products">Products</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark" to="/catalog">Catalog</NavLink>
                                        </NavItem>
                                </span>
                                : null}
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/product-home">Products To Buy</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/rentalevent/request">Event Rentals</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/cart">Cart</NavLink>
                            </NavItem>
                            <LoginMenu>
                            </LoginMenu>
                        </ul>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}
