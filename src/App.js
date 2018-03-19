import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
// import PropTypes from 'prop-types'
// import Header from './common/Header'
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './course/CoursesPage'
import ManageCoursePage from './course/ManageCoursePage'
import ManageRegistrationPage from './registration/ManageRegistrationPage'
import UserDetailsPage from './registration/UserDetailsPage'
import ManageLoginPage from './login/ManageLoginPage'
import ManageCategoryPage from './category/ManageCategoryPage'
import CategoriesPage from './category/CategoriesPage'
import ManageRecipePage from './recipes/ManageRecipePage'
import RecipesPage from './recipes/RecipesPage'
// import 'bootstrap/dist/css/bootstrap.css'
import {Container} from 'reactstrap'
import {Button,} from 'reactstrap'


class App extends React.Component{
    render(){
        
        // const appNav = (
        //     <Navbar inverse collapseOnSelect>
        //             <Navbar.Header>
        //                 <Navbar.Brand>
        //                 <a href="#brand">React-Bootstrap</a>
        //                 </Navbar.Brand>
        //                 <Navbar.Toggle />
        //             </Navbar.Header>
        //             <Navbar.Collapse>
        //                 <Nav>
        //                 <NavItem eventKey={1} href="#">
        //                     Link
        //                 </NavItem>
        //                 <NavItem eventKey={2} href="#">
        //                     Link
        //                 </NavItem>
        //                 <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
        //                     <MenuItem eventKey={3.1}>Action</MenuItem>
        //                     <MenuItem eventKey={3.2}>Another action</MenuItem>
        //                     <MenuItem eventKey={3.3}>Something else here</MenuItem>
        //                     <MenuItem divider />
        //                     <MenuItem eventKey={3.3}>Separated link</MenuItem>
        //                 </NavDropdown>
        //                 </Nav>
        //                 <Nav pullRight>
        //                 <NavItem eventKey={1} href="#">
        //                     Link Right
        //                 </NavItem>
        //                 <NavItem eventKey={2} href="#">
        //                     Link Right
        //                 </NavItem>
        //                 </Nav>
        //             </Navbar.Collapse>
        //         </Navbar>

        // )

        <div>
                <Button color="primary">primary</Button>{' '}
                <Button color="secondary">secondary</Button>{' '}
                <Button color="success">success</Button>{' '}
                <Button color="info">info</Button>{' '}
                <Button color="warning">warning</Button>{' '}
                <Button color="danger">danger</Button>{' '}
                <Button color="link">link</Button>
            </div>

        return (
            <div>
<div>
                <Button color="primary">primary</Button>{' '}
                <Button color="secondary">secondary</Button>{' '}
                <Button color="success">success</Button>{' '}
                <Button color="info">info</Button>{' '}
                <Button color="warning">warning</Button>{' '}
                <Button color="danger">danger</Button>{' '}
                <Button color="link">link</Button>
            </div>

            <div className="container-fluid">
                <header>
                
                


                        <Link to="/">HomePage</Link>
                        {" | "}
                        <Link to="/courses">CoursesPage</Link>
                        {" | "}
                        <Link to="/register">register</Link>
                        {" | "}
                        <Link to="/login">login</Link>
                        {" | "}
                        <Link to="/users">user details</Link>
                        {" | "}
                        <Link to="/register/:id">Edit user</Link>
                        {" | "}
                        <Link to="/course">ManageCoursePage</Link>
                        {" | "}
                        <Link to="/course/:id">ManageCoursePage</Link>
                        {" | "}
                        <Link to="/categories">Category page</Link>
                        {" | "}
                        <Link to="/category">ManageCategoryPage</Link>
                        {" | "}
                        <Link to="/category/:id">ManageCategoryPage</Link>
                        {" | "}
                        <Link to="/recipes">Recipes page</Link>
                        {" | "}
                        <Link to="/recipe">ManageRecipePage</Link>
                        {" | "}
                        <Link to="/recipe/:id">ManageRecipePage</Link>
                        {" | "}
                        <Link to="/about">AboutPage</Link>
                </header>

                <main>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/courses" component={CoursesPage} />
                    <Route exact path="/register" component={ManageRegistrationPage} />
                    <Route exact path="/login" component={ManageLoginPage} />
                    <Route exact path="/users" component={UserDetailsPage} />
                    <Route exact path="/register/:id" component={ManageRegistrationPage} />
                    <Route exact path="/course" component={ManageCoursePage} />
                    <Route exact path="/course/:id" component={ManageCoursePage} />
                    <Route exact path="/categories" component={CategoriesPage} />
                    <Route exact path="/category" component={ManageCategoryPage} />
                    <Route exact path="/category/:id" component={ManageCategoryPage} />
                    <Route exact path="/recipes" component={RecipesPage} />
                    <Route exact path="/recipe" component={ManageRecipePage} />
                    <Route exact path="/recipe/:id" component={ManageRecipePage} />
                    <Route exact path="/about" component={AboutPage} />
                </main>
                
            </div>
            </div>
        );
    }
}

export default App;
