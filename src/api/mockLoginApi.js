import axios from 'axios';

const login = [];

class LoginApi {
  // TODO track the name of the state -- when is it registration and register
  static getUser(user) {
    user = Object.assign({}, user); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      axios.post('https://yummy-foods.herokuapp.com/auth/login', user)
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', response.data.user.username);
          login.push(response.data);
          resolve(login);
        })
        .catch((error) => {
          console.log(error.response);
          reject(error.response.data.Error);
        });
    });
  }

  static logoutUser() {
    return new Promise((resolve, reject) => {
      axios.post('https://yummy-foods.herokuapp.com/auth/logout', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then((response) => {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          login.push(response.data);
        // resolve(login);
        })
        .catch((error) => {
          reject(error.response.data.Error);
        });
    });
  }
}

export default LoginApi;
