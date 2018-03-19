import axios from 'axios'

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const categories = [
  
];


// function replaceAll(str, find, replace) {
//   return str.replace(new RegExp(find, 'g'), replace);
// }

//This would be performed on the server in a real app. Just stubbing in.
const generateId = () => {
  return categories.length+1;
};

class CategoryApi {
  static getAllCategories(page) {
    return new Promise((resolve, reject) => {
      axios.get('http://127.0.0.1:5000/category/?page='+ page, {
        headers: {Authorization:  "Bearer " + localStorage.getItem('token')}
      }).then((response) => {
        // for category in response.data.categories
        var pagination = {current_page: response.data.current_page,
          message: response.data.message,
          next_page: response.data.next_page,
          number_of_pages: response.data.number_of_pages,
          previous_page: response.data.previous_page}
        var new_categories = []
        for (var i = 0; i < response.data.categories.length; ++i)
          new_categories.push(response.data.categories[i])
        resolve([new_categories, pagination]);
      })
      .catch((error)=> {
        console.log(error, '_+_+_++_++_+_+_')
      })
      // setTimeout(() => {
      //   resolve(Object.assign([], categories));
      // }, delay);
    });
  }

  static saveCategory(category) {
    // const{category_name, category_description} = category;
    category = Object.assign({}, category); // to avoid manipulating object passed in.
    
    return new Promise((resolve, reject) => {
      if (category.id) {
        axios.put('http://127.0.0.1:5000/category/'+category.id, category, 
          {headers: {Authorization: "Bearer " + localStorage.getItem('token')}}).then((response) => {
            const existingCategoryIndex = categories.findIndex(a => a.id == category.id);
            categories.splice(existingCategoryIndex, 1, category);
            // categories.push(response.data)
            // console.log(response, categories, "------------------")
            resolve(response.data)
        })
        .catch((error)=> {
          if(error.response && error.response.data){
            console.log(error.response.data, '_+_+_++_++_+_+_')
          }
          console.log(error, '_+_+_++_++_+_+_')
        })
      }else{
        axios.post('http://127.0.0.1:5000/category', category, 
        {headers: {Authorization: "Bearer " + localStorage.getItem('token')}}).then((response) => {
          console.log('-------------------OLD categories', categories)
          // categories.push(response.data)
          console.log("categories------", response, categories, "------------------categories")
          resolve(response.data)
        })
        .catch((error)=> {
          if(error.response && error.response.data){
            console.log(error.response.data, '_+_+_++_++_+_+_')
          }
          console.log(error, '_+_+_++_++_+_+_')
        })
      }
      // resolve(category)
      // setTimeout(() => {
      //   // Simulate server-side validation
      //   const minCategoryTitleLength = 1;
      //   if (category.categoryName.length < minCategoryTitleLength) {
      //     reject(`Title must be at least ${minCategoryTitleLength} characters.`);
      //   }

      //   if (category.id) {
      //     const existingCategoryIndex = categories.findIndex(a => a.id == category.id);
      //     categories.splice(existingCategoryIndex, 1, category);
      //   } else {
      //     //Just simulating creation here.
      //     //The server would generate ids and watchHref's for new courses in a real app.
      //     //Cloning so copy returned is passed by value rather than by reference.
      //     category.id = generateId();
      //     category.date = Date()
      //     categories.push(category);

      //   }
      //   //return courses.push(course);
      //   resolve(category);
      // }, delay);
    });
  }

  static deleteCategory(categoryId) {
    return new Promise((resolve, reject) => {
      // axios.delete('http://127.0.0.1:5000/category/'+categoryId, 
      //   {headers: {Authorization: "Bearer " + localStorage.getItem('token')}}).then((response) => {
      //     const indexOfCategoryToDelete = categories.findIndex(category => 
      //       category.id == categoryId);
      //     categories.splice(indexOfCategoryToDelete, 1);
      //     // console.log("=================================After delete", indexOfCategoryToDelete, categories)
      //     resolve(categories);
      // })
      // .catch((error)=> {
      //   if(error.response && error.response.data){
      //     console.log(error.response.data, '_+_+_++_++_+_+_')
      //   }
      //   console.log(error, '_+_+_++_++_+_+_')
      // })
      // setTimeout(() => {
      //   const indexOfCategoryToDelete = categories.findIndex(category => 
      //     category.id == categoryId);
      //   categories.splice(indexOfCategoryToDelete, 1);
      //   console.log("=================================After delete", indexOfCategoryToDelete, categories)
      //   resolve(categories);
      // }, delay);
    });
  }

  static searchCategories(q, page) {
    console.log(localStorage.getItem('token'), "^^^^^^^^^^^^^^^")
    return new Promise((resolve, reject) => {
      axios.get('http://127.0.0.1:5000/category/search/?q=' + q +'&page='+page, {
        headers: {Authorization:  "Bearer " + localStorage.getItem('token')}
      }).then((response) => {
        // for category in response.data.categories
        var pagination = {current_page: response.data.current_page,
        message: response.data.message,
        next_page: response.data.next_page,
        number_of_pages: response.data.number_of_pages,
        previous_page: response.data.previous_page}

        var newCategories = []
        for (var i = 0; i < response.data.categories.length; ++i)
          newCategories.push(response.data.categories[i])
        resolve([newCategories, pagination]);
      })
      .catch((error)=> {
        console.log(error, '_+_+_++_++_+_+_')
      })
      // setTimeout(() => {
      //   resolve(Object.assign([], categories));
      // }, delay);
    });
  }

}

export default CategoryApi;