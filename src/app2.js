import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import PropTypes from 'prop-types'
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import HomePage from './components/home/HomePage';
import ManageRegistrationPage from './registration/ManageRegistrationPage'
import ManageLoginPage from './login/ManageLoginPage'
import { history } from './_helpers/history'
import CategoriesPage from './category/CategoriesPage'
import ManageCategoryPage from './category/ManageCategoryPage'
import ManageRecipePage from './recipes/ManageRecipePage'
import RecipesPage from './recipes/RecipesPage'
import NavBar from './components/home/NavBar';
import { loadCategories } from './actions/categoryActions'
import { doLogout } from './actions/loginActions'
import configureStore from './store/configureStore'

import 'antd/dist/antd.css';
import './home.css'


const { Header, Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class App extends React.Component {

  constructor(props) {
    super(props);
    history.listen((location, action) => {
        // clear alert on location change
        // dispatch(alertActions.clear());
    });
    this.reloader = this.reloader.bind(this)
  }

  reloader(){
    configureStore.dispatch(loadCategories())
  }

  state = {
    current: 'mail',
  }

  handleLogout(){
    // window.localStorage.removeItem('token')
    configureStore.dispatch(doLogout())
    // console.log(window.localStorage.getItem('token'), "======================<<<<")
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  
  render() {
    const token = window.localStorage.getItem('token')
    return (
      <div>
        <header>
          { token ?
            <Menu
              onClick={this.handleClick}
              // selectedKeys={[this.state.current]}
              mode="horizontal"
            >

            <Menu.Item className="no-hover">
              <Link className="logo" to="/" ></Link>
            </Menu.Item>
          

            
        
          
            <Menu.Item className="on-right">
              <Link className="whiteText" to="/login" onClick={this.handleLogout}> <Icon type="logout" /> Logout</Link>
            </Menu.Item>
            

            
            <SubMenu className="on-right" title={<span className="whiteText"> <Icon type="menu-unfold" /> Yummy </span>}>
            <MenuItemGroup>
              <Menu.Item key="setting:1"><Link className="subText" to="/add/category">Add categories</Link></Menu.Item>
              <Menu.Item key="setting:2"><Link className="subText" onClick={this.reloader} to="/categories">View categories</Link></Menu.Item>
            </MenuItemGroup>
          </SubMenu>
            
            </Menu>
          :
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >

            <Menu.Item className="no-hover">
              <Link className="logo" to="/" ></Link>
            </Menu.Item>
          
            <Menu.Item className="on-right">
              <Link className="whiteText" to="/login" > <Icon type="login" /> Login</Link>
            </Menu.Item>
            
            <Menu.Item className="on-right">
              <Link className="whiteText" to="/register"> <Icon type="user" /> Registration </Link>
            </Menu.Item>
            
            </Menu>
          }
        </header>
        
        {token ?
          <main>
            <Route exact path="/categories" component={CategoriesPage} />
            <Route exact path="/add/category" component={ManageCategoryPage} />
            <Route exact path="/category/:id" component={ManageCategoryPage} />
            <Route exact path="/recipes" component={RecipesPage} />
            <Route exact path="/category/recipes/:id" component={RecipesPage} />
            <Route exact path="/recipe" component={ManageRecipePage} />
            {
              // view recipes in category
            }
            <Route exact path="/view/category/:id/recipes/" component={RecipesPage} />
            {
              // create recipes in category
            }
            <Route exact path="/recipe/:id" component={ManageRecipePage} />
            
            {
              // edit recipes
            }
            <Route exact path="/create/category/:categoryId/recipe/" component={ManageRecipePage} /> 
            {
              // search categories
            }
            <Route exact path="/search/categories/:q/:page" component={CategoriesPage} />
          </main>

          :
          
          <main>
              
              <Route exact path="/" component={HomePage} />
              <Route exact path="/register" component={ManageRegistrationPage} />
              <Route exact path="/login" component={ManageLoginPage} />
              
          </main>
        }
      </div>
    );
  }
}



export default App;
