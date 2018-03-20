import axios from 'axios';
import { push } from 'react-router-redux'
;
const register = [
  {},
];

class RegistrationApi {
  // TODO track the name of the state -- when is it registration and register
  static saveUser(user) {
    user = Object.assign({}, user); 
    return new Promise((resolve, reject) => {
      axios.post('http://127.0.0.1:5000/auth/register', user)
        .then((response) => {
          register.push(response.data);
          resolve(register);
        })
        .catch((error) => {
          reject(error.response.data.Error);
        });
    });
  }

  // TODO track the name of the state -- when is it registration and register
  static getUser(user) {
    user = Object.assign({}, user);
    return new Promise((resolve, reject) => {
      axios.post('http://127.0.0.1:5000/auth/login', user)
        .then((response) => {
          register.push(response.data);
          resolve(register);
        })
        .catch((error) => {
          console.log(error, '_+_+_++_++_+_+_');
        });
    });
  }
}

export default RegistrationApi;
