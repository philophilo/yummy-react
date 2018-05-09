import loginReducer from '../../reducers/loginReducer';
import registrationReducer from '../../reducers/registrationReducer';
import categoryReducer from '../../reducers/categoryReducer';
import recipeReducer from '../../reducers/recipeReducer';
import paginationReducer from '../../reducers/paginationReducer';


describe('Reducers changes state on', () => {
  it('has a default state on', () => {
    expect(loginReducer(undefined, { type: 'unexpected' }))
      .toEqual([]);
  }),
  it('changes state on user login', () => {
    const results =
        {
          type: 'DO_LOGIN_SUCESS',
          login: { username: 'name', password: 'password' },
        };
    expect(loginReducer({}, results))
      .toEqual({});
  }),


  it('changes state on user register', () => {
    const results =
        {
          type: 'CREATE_USER_SUCCESS',
          register: {},
        };
    expect(registrationReducer([
      {
        name: 'name name',
        username: 'name',
        password: 'password',
      },
    ], results))
      .toEqual([{
        name: 'name name',
        username: 'name',
        password: 'password',
      }, {}]);
  }),
  it('loads user details', () => {
    const results =
        {
          type: 'LOAD_REGISTER_SUCCESS',
          register: [{
            name: 'name name',
            username: 'name',
            password: 'password',
          }],
        };
    expect(registrationReducer([
      {
        name: 'name name',
        username: 'name',
        password: 'password',
      },
    ], results))
      .toEqual([{
        name: 'name name',
        username: 'name',
        password: 'password',
      }]);
  }),


  it('loads all categories', () => {
    const results =
        {
          type: 'LOAD_CATEGORIES_SUCCESS',
          categories: [
            { category_description: 'this is chicken',
              category_name: 'My chicken',
              id: 24 },
          ],
        };
    expect(categoryReducer([
      {
        category_description: 'this is chicken',
        category_name: 'My chicken',
        id: 24,
      },
    ], results))
      .toEqual([{
        category_description: 'this is chicken',
        category_name: 'My chicken',
        id: 24,
      }]);
  }),
  it('creates categories', () => {
    const results =
        {
          type: 'CREATE_CATEGORY_SUCCESS',
          register: [],
        };
    expect(categoryReducer([
      {
        category_description: 'this is chicken',
        category_name: 'My chicken',
        id: 24,
      },
    ], {}, results))
      .toEqual([{
        category_description: 'this is chicken',
        category_name: 'My chicken',
        id: 24,
      }]);
  }),
  it('updates category', () => {
    const results =
        {
          type: 'UPDATE_CATEGORY_SUCCESS',
          register: [
            'category_description': "this is chicken",
            'category_name': "My chicken",
            'id': 24,
          ],
        };
    expect(categoryReducer([
      {
        category_description: 'new chicken',
        category_name: 'My chicken',
        id: 24,
      },
    ], {}, results))
      .toEqual([{
        category_description: 'new chicken',
        category_name: 'My chicken',
        id: 24,
      }]);
  }),


  it('loads all recipes', () => {
    const results =
        {
          type: 'LOAD_RECIPES_SUCCESS',
          recipes: [
            { category_id: 24,
              category_name: 'My chicken',
              description: 'sdfdfsdffsd',
              id: 45,
              ingredients: [
                'sdfsdf ',
                '  sdfsd',
                ' sddfd',
              ],
              recipe_date: 'Mon, 19 Mar 2018 09:39:44 GMT',
              recipe_name: 'ajhbdsvkjnds' },
          ],
        };
    expect(recipeReducer([
      {
        category_id: 24,
        category_name: 'My chicken',
        description: 'sdfdfsdffsd',
        id: 45,
        ingredients: [
          'sdfsdf ',
          '  sdfsd',
          ' sddfd',
        ],
        recipe_date: 'Mon, 19 Mar 2018 09:39:44 GMT',
        recipe_name: 'ajhbdsvkjnds',
      },
    ], results))
      .toEqual([{
        category_id: 24,
        category_name: 'My chicken',
        description: 'sdfdfsdffsd',
        id: 45,
        ingredients: [
          'sdfsdf ',
          '  sdfsd',
          ' sddfd',
        ],
        recipe_date: 'Mon, 19 Mar 2018 09:39:44 GMT',
        recipe_name: 'ajhbdsvkjnds',
      }]);
  }),
  it('creates recipes', () => {
    const results =
        {
          type: 'CREATE_RECIPE_SUCCESS',
          recipe: [],
        };
    expect(recipeReducer([
      {
        description: 'sdfdfsdffsd',
        id: 45,
        ingredients: [
          'sdfsdf ',
          '  sdfsd',
          ' sddfd',
        ],
        recipe_name: 'ajhbdsvkjnds',
      },
    ], {}, results))
      .toEqual([{
        description: 'sdfdfsdffsd',
        id: 45,
        ingredients: [
          'sdfsdf ',
          '  sdfsd',
          ' sddfd',
        ],
        recipe_name: 'ajhbdsvkjnds',
      }]);
  }),
  it('updates recipes', () => {
    const results =
        {
          type: 'UPDATE_CATEGORY_SUCCESS',
          recipes: [
            { category_id: 24,
              category_name: 'My chicken',
              description: 'sdfdfsdffsd',
              id: 45,
              ingredients: [
                'sdfsdf ',
                '  sdfsd',
                ' sddfd',
              ],
              recipe_date: 'Mon, 19 Mar 2018 09:39:44 GMT',
              recipe_name: 'ajhbdsvkjnds' },
          ],
        };
    expect(categoryReducer([
      {
        category_id: 24,
        category_name: 'My chicken',
        description: 'new redeable description',
        id: 45,
        ingredients: [
          'sdfsdf ',
          '  sdfsd',
          ' sddfd',
        ],
        recipe_date: 'Mon, 19 Mar 2018 09:39:44 GMT',
        recipe_name: 'ajhbdsvkjnds',
      },
    ], {}, results))
      .toEqual([{
        category_id: 24,
        category_name: 'My chicken',
        description: 'new redeable description',
        id: 45,
        ingredients: [
          'sdfsdf ',
          '  sdfsd',
          ' sddfd',
        ],
        recipe_date: 'Mon, 19 Mar 2018 09:39:44 GMT',
        recipe_name: 'ajhbdsvkjnds',
      }]);
  });
});
