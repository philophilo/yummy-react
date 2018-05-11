import axios from 'axios';

const register = [];

class RegistrationApi {
  // TODO track the name of the state -- when is it registration and register
  static saveUser(user) {
    user = Object.assign({}, user);
    return new Promise((resolve, reject) => {
      axios.post('https://api2.philophilo.xyz/auth/register', user)
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
  static getUser() {
    return new Promise((resolve, reject) => {
      axios.get('https://api2.philophilo.xyz/auth/get_user', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then((response) => {
          resolve([response.data.user]);
        })
        .catch((error) => {
          reject(error.response.data.Error);
          console.log(error.response.data.Error, '_+_+_++_++_+_+_');
        });
    });
  }

  static changePassword(user) {
    user.password = user.current_password;
    return new Promise((resolve, reject) => {
      axios.put('https://api2.philophilo.xyz/auth/reset-password', user, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then((response) => {
          resolve(response.data.message);
        })
        .catch((error) => {
          reject(error.response.data.Error);
        });
    });
  }
}

export default RegistrationApi;
