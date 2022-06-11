import { async } from 'regenerator-runtime';
import { APT_URL, RES_PER_PAGE, KEY } from './configure.js';
//import { getJSON, sendJSON } from './helper.js';
import { AJAX } from './helper.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultperPage: RES_PER_PAGE,
    page: 1,
  },
  bookMarks: [],
};
const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    source: recipe.source_url,
    cookingTime: recipe.cooking_time,
    image: recipe.image_url,
    servings: recipe.servings,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${APT_URL}/${id}?key=${KEY}`);
    /* const res = await fetch(`${APT_URL}/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${data.status})`);*/
    //console.log(res, data);
    state.recipe = createRecipeObject(data);

    console.log(state.bookMarks);
    if (state.bookMarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookMarked = true;
      console.log(state.recipe.bookMarked);
    } else state.recipe.bookMarked = false;

    //console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${APT_URL}?search=${query}&key=${KEY}`);
    console.log(data);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.log(`${err} 💥💥💥💥`);
  }
};
export const getSearchResultPerPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultperPage;
  const end = page * state.search.resultperPage;
  return state.search.results.slice(start, end);
};
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(
    ing => (ing.quantity = (ing.quantity * newServings) / state.recipe.servings)
  );
  state.recipe.servings = newServings;
};
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookMarks));
};
export const addBookMarks = function (recipe) {
  state.bookMarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookMarked = true;
  persistBookmarks();
};
export const deleteBookMark = function (id) {
  const index = state.bookMarks.findIndex(ele => ele.id === id);
  state.bookMarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookMarked = false;
  persistBookmarks();
};
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookMarks = JSON.parse(storage);
};
init();
const clearBookmark = function () {
  localStorage.clear('bookmarks');
};
//clearBookmark();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArry = ing[1].split(',').map(ing => ing.trim());
        if (ingArry.length !== 3)
          throw new Error(
            'Wrong ingredient format ! please use the correct format'
          );
        const [quantity, unit, description] = ingArry;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const data = await AJAX(`${APT_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookMarks(state.recipe);
  } catch (err) {
    throw err;
  }
};
