import { Menu, Icon } from 'antd';
import React from 'react';
import { Route, Link } from 'react-router-dom'
import HomePage from './components/home/HomePage';
import ManageRegistrationPage from './components/registration/ManageRegistrationPage'
import ManageLoginPage from './components/login/ManageLoginPage'
import CategoriesPage from './components/category/CategoriesPage'
import ManageCategoryPage from './components/category/ManageCategoryPage'
import ManageRecipePage from './components/recipes/ManageRecipePage'
import RecipesPage from './components/recipes/RecipesPage'
import { loadCategories } from './actions/categoryActions'
import { doLogout } from './actions/loginActions'
import { loadUsers } from './actions/registrationActions'
import configureStore from './store/configureStore'
import UserDetailsPage from './components/registration/UserDetailsPage'

import 'bootstrap3/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css';
import './home.css'


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class App extends React.Component {

  constructor(props) {
    super(props);
    this.reloader = this.reloader.bind(this)
  }

  reloader(){
    configureStore.dispatch(loadCategories())
  }

  state = {
    current: 'mail',
  }

  handleLogout(){
    configureStore.dispatch(doLogout())
  }

  handleLoadRegister(){
    configureStore.dispatch(loadUsers())
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  
  render() {
    const token = window.localStorage.getItem('token')
    const username = window.localStorage.getItem('username')
    return (
      <div>
        <header>
          { token ?
            <Menu
              onClick={this.handleClick}
              mode="horizontal"
            >

            <Menu.Item className="no-hover">
              <Link className="logo" to="/" ></Link>
            </Menu.Item>
            
            <SubMenu className="on-right" title={<span className="whiteText"> <Icon type="user" /> {username} </span>}>
              <MenuItemGroup>
                <Menu.Item key="setting:1"><Link className="subText" to="/user" onClick={this.handleLoadRegister}>Account</Link></Menu.Item>
                <Menu.Item key="setting:2"><Link to="/login" onClick={this.handleLogout}> <Icon type="logout" /> Logout</Link></Menu.Item>
              </MenuItemGroup>
            </SubMenu>

            
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
            <Route exact path="/user" component={UserDetailsPage} />
            <Route exact path="/" component={CategoriesPage} />
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
            <Route exact path="/edit/user/:id" component={ManageRegistrationPage} />
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
