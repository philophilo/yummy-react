import axios from 'axios';
import { history } from "../_helpers/history";
import { push } from 'react-router-redux'

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const register = [
  {
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (course) => {
  return register.length+1;
};

class RegistrationApi {
  static getAllUsers() {
    return new Promise((resolve, reject) => {
      
      // setTimeout(() => {
      //   resolve(Object.assign([], register));
      // }, delay);
    });
  }
  
  // TODO track the name of the state -- when is it registration and register
  static saveUser(user) {
    user = Object.assign({}, user); // to avoid manipulating object passed in.
    console.log(user, "*&*&*&*&*&*&*&*&*&*")
    return new Promise((resolve, reject) => {
      axios.post('http://127.0.0.1:5000/auth/register', user)
      .then((response) => {
        register.push(response.data)
        console.log(response, register, "------------------")
        resolve(register)
      })
      .catch((error)=> {
        reject(error.response.data.Error)
        console.log(error.response.data.Error, '_+_+_++_++_+_+_')
      })
      // setTimeout(() => {
      //   // Simulate server-side validation
      //   const minNameLength = 1;
      //   if (user.name.length < minNameLength) {
      //     reject(`Title must be at least ${minNameLength} characters.`);
      //   }

      //   if (user.id) {
      //     const existingUserIndex = register.findIndex(a => a.id == user.id);
      //     register.splice(existingUserIndex, 1, user);
      //   } else {
      //     //Just simulating creation here.
      //     //The server would generate ids and watchHref's for new courses in a real app.
      //     //Cloning so copy returned is passed by value rather than by reference.
      //     user.id = generateId(user);
      //     register.push(user);

      //   }
      //   //return courses.push(course);
      //   resolve(user);
      // }, delay);
    });
  }

  // TODO track the name of the state -- when is it registration and register
  static getUser(user) {
    console.log("0***********", user)
    user = Object.assign({}, user); // to avoid manipulating object passed in.
    console.log("1**********", user)
    return new Promise((resolve, reject) => {
      axios.post('http://127.0.0.1:5000/auth/login', user)
      .then((response) => {
        register.push(response.data)
        console.log(response, register, "------------------")
        resolve(register)
      })
      .catch((error)=> {
        console.log(error, '_+_+_++_++_+_+_')
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

  // static deleteCourse(userId) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       const indexOfRegisterToDelete = register.findIndex(user => {
  //         user.id == userId;
  //       });
  //       register.splice(indexOfRegisterToDelete, 1);
  //       resolve();
  //     }, delay);
  //   });
  // }
}

export default RegistrationApi;
