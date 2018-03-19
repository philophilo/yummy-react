import axios from 'axios';
import { history } from "../_helpers/history";

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const login = [
  {
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

class LoginApi {
  // TODO track the name of the state -- when is it registration and register
  static getUser(user) {
    user = Object.assign({}, user); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      axios.post('http://127.0.0.1:5000/auth/login', user)
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        login.push(response.data)
        console.log(response, login, "------------------")
        resolve(login);
      })
      .catch((error)=> {
        reject(error.response.data.Error)
        console.log(error.response.data.Error, '_+_+_++_++_+_+_')
      })
      // setTimeout(() => {
      //   // Simulate server-side validation
      //   const minUsernameLength = 1;
      //   if (user.username.length < minUsernameLength) {
      //     reject(`Title must be at least ${minUsernameLength} characters.`);
      //   }
      //   const foundUser = register.findIndex(a => a.username == user.username);
      //   console.log("final>>>>>>>>>>>>>", foundUser, register[foundUser])
      //   resolve(register[foundUser]);
      // }, delay);
    });
  }

  static logoutUser() {
    console.log("at logout==================================", localStorage.getItem('token'))
    return new Promise((resolve, reject) => {
      axios.post('http://127.0.0.1:5000/auth/logout', {
        headers: {Authorization:  "Bearer " + localStorage.getItem('token')}
      })
      .then((response) => {
        localStorage.removeItem('token')
        login.push(response.data)
        console.log(response, login, "------------------")
        // resolve(login);
      })
      .catch((error)=> {
        console.log(error.response, '_+_+_++_++_+_+_')
        reject(error.response.data.Error)
        
      })
      // setTimeout(() => {
      //   // Simulate server-side validation
      //   const minUsernameLength = 1;
      //   if (user.username.length < minUsernameLength) {
      //     reject(`Title must be at least ${minUsernameLength} characters.`);
      //   }
      //   const foundUser = register.findIndex(a => a.username == user.username);
      //   console.log("final>>>>>>>>>>>>>", foundUser, register[foundUser])
      //   resolve(register[foundUser]);
      // }, delay);
    });
  }

}

export default LoginApi;
