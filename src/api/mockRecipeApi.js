import axios from 'axios'
const recipes = [];

class RecipeApi {

  static getCategoryRecipes(category_id, page) {
    return new Promise((resolve, reject) => {
      axios.get('http://127.0.0.1:5000/category/'+category_id+'/recipes/?page='+page, {
        headers: {Authorization:  "Bearer " + localStorage.getItem('token')}
      }).then((response) => {
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
          
        recipes.push(new_recipes)
        resolve([new_recipes, pagination]);
        
      })
      .catch((error)=> {
        reject(error.response.data.Error);
      })
    });
  }

  static saveRecipe(recipe, categoryId = null) {
    recipe = Object.assign({}, recipe); // to avoid manipulating object passed in.
    recipe['ingredients'] = recipe['ingredients'].toString()
    return new Promise((resolve, reject) => {

      if (recipe.id) {
        recipe.recipe_category_id = recipe.category_id
        axios.put('http://127.0.0.1:5000/category/'+recipe.category_id+'/recipes/'+recipe.id, recipe, 
        {headers: {Authorization: "Bearer " + localStorage.getItem('token')}}).then((response) => {
          const existingRecipeIndex = recipes.findIndex(a => a.id == recipe.id);
          resolve(response.data)
        })
        .catch((error)=> {
          if(error.response && error.response.data){
            reject(error.response.data.Error)
          }
          
        })

      }else{
        axios.post('http://127.0.0.1:5000/category/'+categoryId+'/recipes/', recipe, 
        {headers: {Authorization: "Bearer " + localStorage.getItem('token')}}).then((response) => {
          recipes.push(response.data)
          var data = response.data
          data.category_id = categoryId
          resolve(data)
        })
        .catch((error)=> {
          reject(error.response.data.Error)
        })
      }
    });
  }

  static deleteRecipe(category_id, recipeId) {
    return new Promise((resolve, reject) => {
      axios.delete('http://127.0.0.1:5000/category/'+ category_id+'/recipes/'+recipeId, 
        {headers: {Authorization: "Bearer " + localStorage.getItem('token')}}).then((response) => {
        const indexOfRecipeToDelete = recipes.findIndex(recipe => recipe.id == recipeId);
        recipes.splice(indexOfRecipeToDelete, 1);
        resolve(response.data.message);
      })
      .catch((error)=> {
        if(error.response && error.response.data){
          reject(error.response.data.Error)
        }
      })
    });
  }

  static searchCategoryRecipes(q, page) {
    return new Promise((resolve, reject) => {
      axios.get('http://127.0.0.1:5000/recipes/search/?q='+q+'&page='+page+'&per_page=2', {
        headers: {Authorization:  "Bearer " + localStorage.getItem('token')}
      }).then((response) => {
        
        var pagination = {current_page: response.data.current_page,
          message: response.data.message,
          next_page: response.data.next_page,
          number_of_pages: response.data.number_of_pages,
          previous_page: response.data.previous_page}
        resolve([response.data.recipes, pagination]);
      })
      .catch((error)=> {
        reject(error.response.data.Error)
      })
    });
      
  }

}

export default RecipeApi;