import axios from 'axios';

const login = [
  {},
];

class LoginApi {
  // TODO track the name of the state -- when is it registration and register
  static getUser(user) {
    user = Object.assign({}, user); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      axios.post('http://127.0.0.1:5000/auth/login', user)
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          login.push(response.data);
          resolve(login);
        })
        .catch((error) => {
          reject(error.response.data.Error);
          console.log(error.response.data.Error, '_+_+_++_++_+_+_');
        });
    });
  }

  static logoutUser() {
    return new Promise((resolve, reject) => {
      axios.post('http://127.0.0.1:5000/auth/logout', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      })
        .then((response) => {
          localStorage.removeItem('token');
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
