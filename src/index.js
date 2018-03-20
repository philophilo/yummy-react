import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore, { history } from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import { loadUsers } from './actions/registrationActions';
import { loadCategories } from './actions/categoryActions';
// import { loadCategoryRecipes } from './actions/recipeActions'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
// import configureStore from './store/configureStore';

const store = configureStore;
// store.dispatch(loadUsers())
if (localStorage.getItem('token')) {
  store.dispatch(loadCategories());
  store.dispatch(loadUsers());
}
// store.dispatch(loadCategoryRecipes())

// <Router history={BrowserHistory}>routes={routes}</Router>
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App {...this.props} />
      </div>
    </ConnectedRouter>
  </Provider>, document.getElementById('root'),
);
registerServiceWorker();
