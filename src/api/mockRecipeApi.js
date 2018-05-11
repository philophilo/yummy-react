import axios from 'axios';

const recipes = [];

class RecipeApi {
  static getCategoryRecipes(categoryId, page) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api2.philophilo.xyz/category/${categoryId}/recipes/?page=${page}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }).then((response) => {
        const newRecipes = [];
        for (let i = 0; i < response.data.recipes.length; ++i) {
          response.data.recipes[i].category_name = response.data.category_name;

          newRecipes.push(response.data.recipes[i]);
        }

        const pagination = { current_page: response.data.current_page,
          message: response.data.message,
          next_page: response.data.next_page,
          number_of_pages: response.data.number_of_pages,
          previous_page: response.data.previous_page };

        recipes.push(newRecipes);
        resolve([newRecipes, pagination]);
      })
        .catch((error) => {
          reject(error.response.data.Error);
        });
    });
  }

  static saveRecipe(recipe, categoryId = null) {
    recipe = Object.assign({}, recipe); // to avoid manipulating object passed in.
    recipe.ingredients = recipe.ingredients.toString();
    return new Promise((resolve, reject) => {
      if (recipe.id) {
        recipe.recipe_category_id = recipe.category_id;
        axios.put(`https://api2.philophilo.xyz/category/${recipe.category_id}/recipes/${recipe.id}`, recipe,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then((response) => {
          resolve(response.data);
        })
          .catch((error) => {
            if (error.response && error.response.data) {
              reject(error.response.data.Error);
            }
          });
      } else {
        axios.post(`https://api2.philophilo.xyz/category/${categoryId}/recipes/`, recipe,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then((response) => {
          recipes.push(response.data);
          const data = response.data;
          data.category_id = categoryId;
          resolve(data);
        })
          .catch((error) => {
            reject(error.response.data.Error);
          });
      }
    });
  }

  static deleteRecipe(categoryId, recipeId) {
    return new Promise((resolve, reject) => {
      axios.delete(`https://api2.philophilo.xyz/category/${categoryId}/recipes/${recipeId}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then((response) => {
        const indexOfRecipeToDelete = recipes.findIndex(recipe => recipe.id === recipeId);
        recipes.splice(indexOfRecipeToDelete, 1);
        resolve(response.data.message);
      })
        .catch((error) => {
          if (error.response && error.response.data) {
            reject(error.response.data.Error);
          }
        });
    });
  }

  static searchCategoryRecipes(q, page) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api2.philophilo.xyz/recipes/search/?q=${q}&page=${page}&per_page=2`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }).then((response) => {
        const pagination = { current_page: response.data.current_page,
          message: response.data.message,
          next_page: response.data.next_page,
          number_of_pages: response.data.number_of_pages,
          previous_page: response.data.previous_page };
        resolve([response.data.recipes, pagination]);
      })
        .catch((error) => {
          reject(error.response.data.Error);
        });
    });
  }
}

export default RecipeApi;
