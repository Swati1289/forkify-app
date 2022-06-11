import * as model from './model.js';
import { CLOSE_MODAL_SEC } from './configure.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultView from './view/resultView.js';
import paginationView from './view/paginationView.js';
import bookmarkView from './view/bookmarkView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import addrecipeView from './view/addrecipeView.js';
import { async } from 'regenerator-runtime/runtime';

//if (module.hot) {
//module.hot.accept();
//}

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    //render spinner
    recipeView.renderSpinner();

    // update resultview to add mark search result

    resultView.update(model.getSearchResultPerPage());

    bookmarkView.update(model.state.bookMarks);

    //fetching data from API and loading
    await model.loadRecipe(id);

    //const res = await fetch(
    //  'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    // );

    //const { recipe } = ;
    //console.log(recipe);

    //rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(`${err} 💥💥💥💥`);
    recipeView.renderError();
  }
};

const controlSearch = async function () {
  //get search results
  const query = searchView.getQuery();
  if (!query) return;
  //render spinner
  resultView.renderSpinner();
  try {
    //load serach results
    await model.loadSearchResult(query);
    //render search results
    //resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultPerPage());

    //rendering initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (goToPage) {
  //console.log(goToPage);
  //render new  search results
  resultView.render(model.getSearchResultPerPage(goToPage));

  //rendering New pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);

  //update the view
  recipeView.update(model.state.recipe);
};
const controlAddBookmarks = function () {
  //add or delet book mark
  if (!model.state.recipe.bookMarked) model.addBookMarks(model.state.recipe);
  else model.deleteBookMark(model.state.recipe.id);
  //update recepeview
  recipeView.update(model.state.recipe);
  //list bookmarks
  bookmarkView.render(model.state.bookMarks);
};
//controlSearch();
const controlBookmark = function () {
  bookmarkView.render(model.state.bookMarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    // add spinner
    addrecipeView.renderSpinner();
    //upload recipe data
    await model.uploadRecipe(newRecipe);

    //render recipe
    recipeView.render(model.state.recipe);

    //render book mark view
    bookmarkView.render(model.state.bookMarks);

    //getting present id i in url

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // success message
    addrecipeView.renderMessage();
    //close form
    setTimeout(function () {
      //addrecipeView.toggleWindow();
    }, CLOSE_MODAL_SEC * 1000);
  } catch (err) {
    console.log(err, '💥💥💥💥');
    addrecipeView.renderError(err.message);
  }
};
const init = function () {
  bookmarkView.addHandler(controlBookmark);
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpadateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmarks);
  addrecipeView.uploadRecipe(controlAddRecipe);
};
init();
