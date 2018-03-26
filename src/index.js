import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import configureStore, { history } from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import { loadUsers } from './actions/registrationActions';
import { loadCategories } from './actions/categoryActions';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';


const store = configureStore;

if (localStorage.getItem('token')) {
  store.dispatch(loadCategories());
  store.dispatch(loadUsers());
}

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
