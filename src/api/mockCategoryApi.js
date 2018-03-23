import axios from 'axios';

const categories = [];

class CategoryApi {
  static getAllCategories(page) {
    return new Promise((resolve, reject) => {
      axios.get(`https://yummy-foods.herokuapp.com/category/?page=${page}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }).then((response) => {
        // pagination
        const pagination = { current_page: response.data.current_page,
          message: response.data.message,
          next_page: response.data.next_page,
          number_of_pages: response.data.number_of_pages,
          previous_page: response.data.previous_page };
        const newCategories = [];
        // attach to existing categories
        for (let i = 0; i < response.data.categories.length; ++i) {
          newCategories.push(response.data.categories[i]);
        }
        resolve([newCategories, pagination]);
      })
        .catch((error) => {
          reject(error.response.data.message);
        });
    });
  }

  static saveCategory(category) {
    category = Object.assign({}, category); // to avoid manipulating object passed in.

    return new Promise((resolve, reject) => {
      if (category.id) {
        axios.put(`https://yummy-foods.herokuapp.com/category/${category.id}`, category,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then((response) => {
          const existingCategoryIndex = categories.findIndex(a => a.id === category.id);
          categories.splice(existingCategoryIndex, 1, category);
          resolve(response.data);
        })
          .catch((error) => {
            reject(error.response.data.Error);
          });
      } else {
        axios.post('https://yummy-foods.herokuapp.com/category', category,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then((response) => {
          resolve(response.data);
        })
          .catch((error) => {
            reject(error.response.data.Error);
          });
      }
    });
  }

  static deleteCategory(categoryId) {
    return new Promise((resolve, reject) => {
      axios.delete(`https://yummy-foods.herokuapp.com/category/${categoryId}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then((response) => {
        const indexOfCategoryToDelete = categories.findIndex(category =>
          category.id === categoryId);
        categories.splice(indexOfCategoryToDelete, 1);
        resolve([categories, response.data.message]);
      })
        .catch((error) => {
          reject(error.response.data.Error);
        });
    });
  }

  static searchCategories(q, page) {
    return new Promise((resolve, reject) => {
      axios.get(`https://yummy-foods.herokuapp.com/category/search/?q=${q}&page=${page}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }).then((response) => {
        // organise pagination
        const pagination = { current_page: response.data.current_page,
          message: response.data.message,
          next_page: response.data.next_page,
          number_of_pages: response.data.number_of_pages,
          previous_page: response.data.previous_page };

        const newCategories = [];
        for (let i = 0; i < response.data.categories.length; ++i) {
          newCategories.push(response.data.categories[i]);
        }
        resolve([newCategories, pagination]);
      })
        .catch((error) => {
          reject(error.response.data.Error);
        });
    });
  }
}

export default CategoryApi;
