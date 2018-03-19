import axios from 'axios'

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const recipes = [];


// function replaceAll(str, find, replace) {
//   return str.replace(new RegExp(find, 'g'), replace);
// }

//This would be performed on the server in a real app. Just stubbing in.
const generateId = () => {
  return recipes.length+1;
};

class RecipeApi {
  // static getAllRecipes() {
  //   return new Promise((resolve, reject) => {
  //     axios.get('http://127.0.0.1:5000/category/27/recipes/', {
  //       headers: {Authorization:  "Bearer " + localStorage.getItem('token')}
  //     }).then((response) => {
  //       // for category in response.data.recipes
        
  //       for (var i = 0; i < response.data.recipes.length; ++i){
  //         response.data.recipes[i].category_name = response.data.category_name
  //         recipes.push(response.data.recipes[i])
  //       }
  //       console.log(response.data, recipes, "------?--??--?recipes----?---")
  //       resolve(Object.assign([], recipes));
        
  //     })
  //     .catch((error)=> {
  //       console.log(error, '_+_+_++_++_+_+_')
  //     })
  //     // setTimeout(() => {
  //     //   resolve(Object.assign([], categories));
  //     // }, delay);
  //   });
      
  // }

  static getCategoryRecipes(category_id, page) {
    console.log("###########################################################category_id", category_id)
    return new Promise((resolve, reject) => {
      axios.get('http://127.0.0.1:5000/category/'+category_id+'/recipes/?page='+page, {
        headers: {Authorization:  "Bearer " + localStorage.getItem('token')}
      }).then((response) => {
        // recipes =  
        // const{category_name, recipes} =response.data;
        var new_recipes = []
        for (var i = 0; i < response.data.recipes.length; ++i){
          response.data.recipes[i].category_name = response.data.category_name
          
          new_recipes.push(response.data.recipes[i])
        }

        var pagination = {current_page: response.data.current_page,
          message: response.data.message,
          next_page: response.data.next_page,
          number_of_pages: response.data.number_of_pages,
          previous_page: response.data.previous_page}

        console.log("--------------***", pagination)
        recipes.push(new_recipes)
        // recipes.push(response.data.recipes)
        // console.log(response.data, recipes, "------?--??--?recipes----?---")
        // resolve([...recipes, category_name]);
        resolve([new_recipes, pagination]);
        
      })
      .catch((error)=> {
        reject(error.response.data.Error);
      })
      // setTimeout(() => {
      //   resolve(Object.assign([], categories));
      // }, delay);
    });
      
  }

  static saveRecipe(recipe, categoryId = null) {
    recipe = Object.assign({}, recipe); // to avoid manipulating object passed in.
    console.log(recipe, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<recipe here")
    recipe['ingredients'] = recipe['ingredients'].toString()
    return new Promise((resolve, reject) => {

      if (recipe.id) {
        recipe.recipe_category_id = recipe.category_id
        axios.put('http://127.0.0.1:5000/category/'+recipe.category_id+'/recipes/'+recipe.id, recipe, 
        {headers: {Authorization: "Bearer " + localStorage.getItem('token')}}).then((response) => {
          const existingRecipeIndex = recipes.findIndex(a => a.id == recipe.id);
          // recipes.splice(existingRecipeIndex, 1, recipe);
          console.log(recipes, response.data, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,updated recipes")
          // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~", existingRecipeIndex, recipes)
          // recipes.push(response.data)
          // console.log(response, recipes, "------------------")
          resolve(response.data)
        })
        .catch((error)=> {
          if(error.response && error.response.data){
            console.log(error.response.data, '_+_+_++_++_+_+_')
          }
          console.log(error, '_+_+_++_++_+_+_')
        })
        // axios.put('http://127.0.0.1:5000/category/'+category.id, category, 
        //   {headers: {Authorization: "Bearer " + localStorage.getItem('token')}}).then((response) => {
        //     const existingCategoryIndex = categories.findIndex(a => a.id == category.id);
        //     categories.splice(existingCategoryIndex, 1, category);
        //     // categories.push(response.data)
        //     // console.log(response, categories, "------------------")
        //     resolve(categories)
        // })
        // .catch((error)=> {
        //   if(error.response && error.response.data){
        //     console.log(error.response.data, '_+_+_++_++_+_+_')
        //   }
        //   console.log(error, '_+_+_++_++_+_+_')
        // })
      }else{
        //'+recipe.categoryId+'
        console.log(categoryId, "++++++++++++++++++++++++++++++++++++++++++^%^&^%^&%^%^&%^%^%%^")
        axios.post('http://127.0.0.1:5000/category/'+categoryId+'/recipes/', recipe, 
        {headers: {Authorization: "Bearer " + localStorage.getItem('token')}}).then((response) => {
          recipes.push(response.data)
          var data = response.data
          data.category_id = categoryId
          console.log(data, "-at the post-----------------")
          resolve(data)
        })
        .catch((error)=> {
          if(error.response && error.response.data){
            console.log(error.response.data, '_+_+_++_++_+_+_')
          }
          console.log(error, '_+_+_++_++_+_+_')
        })
      }
      // resolve(recipe)
      // setTimeout(() => {
      //   // Simulate server-side validation
      //   const minRecipeTitleLength = 1;
      //   if (recipe.recipeName.length < minRecipeTitleLength) {
      //     reject(`Title must be at least ${minRecipeTitleLength} characters.`);
      //   }

      //   if (recipe.id) {
      //     const existingRecipeIndex = recipes.findIndex(a => a.id == recipe.id);
      //     recipes.splice(existingRecipeIndex, 1, recipe);
      //   } else {
      //     //Just simulating creation here.
      //     //The server would generate ids and watchHref's for new courses in a real app.
      //     //Cloning so copy returned is passed by value rather than by reference.
      //     recipe.id = generateId();
      //     recipe.recipeDate = Date()
      //     recipes.push(recipe);

      //   }
      //   //return courses.push(course);
      //   resolve(recipe);
      // }, delay);
    });
  }

  static deleteRecipe(category_id, recipeId) {
    return new Promise((resolve, reject) => {
      axios.delete('http://127.0.0.1:5000/category/'+ category_id+'/recipes/'+recipeId, 
        {headers: {Authorization: "Bearer " + localStorage.getItem('token')}}).then((response) => {
        const indexOfRecipeToDelete = recipes.findIndex(recipe => recipe.id == recipeId);
        recipes.splice(indexOfRecipeToDelete, 1);
        console.log("deletin complete==============", recipes)
        resolve(response.data.message);
      })
      .catch((error)=> {
        if(error.response && error.response.data){
          console.log(error.response.data.Error, '_+_+_++_++_+_+_')
          // reject(error.response.data.Error)
        }
      })

      // setTimeout(() => {
      //   const indexOfRecipeToDelete = recipes.findIndex(recipe => recipe.id == recipeId);
      //   recipes.splice(indexOfRecipeToDelete, 1);
      //   resolve(recipes);
      // }, delay);
    });
  }

  static searchCategoryRecipes(q, page) {
    console.log("###########################################################category_id", q)
    return new Promise((resolve, reject) => {
      axios.get('http://127.0.0.1:5000/recipes/search/?q='+q+'&page='+page+'&per_page=2', {
        headers: {Authorization:  "Bearer " + localStorage.getItem('token')}
      }).then((response) => {
        // recipes =  
        // const{category_name, recipes} =response.data;
        console.log("++++++++++++++++++++++++++++++++=helo from search")
        
        var pagination = {current_page: response.data.current_page,
          message: response.data.message,
          next_page: response.data.next_page,
          number_of_pages: response.data.number_of_pages,
          previous_page: response.data.previous_page}

        console.log("--------------***", pagination)
        // recipes.push(response.data.recipes)
        // console.log(response.data, recipes, "------?--??--?recipes----?---")
        // resolve([...recipes, category_name]);
        resolve([response.data.recipes, pagination]);
        
      })
      .catch((error)=> {
        // reject([]);
        console.log(error, '_+_+_++_++_+_+_')
      })
      // setTimeout(() => {
      //   resolve(Object.assign([], categories));
      // }, delay);
    });
      
  }

}

export default RecipeApi;