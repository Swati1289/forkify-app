import View from './View';
import icon from 'url:../../img/icons.svg';
import { state } from '../model';

class addRecipeView extends View {
  _message = 'The new recipe is successfully added';
  _parentEl = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._openRecipeForm();
    this._closeRecipeForm();
  }
  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _openRecipeForm() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    console.log('asdg');
  }
  _closeRecipeForm() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  uploadRecipe(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataarr = [...new FormData(this)];
      const data = Object.fromEntries(dataarr);
      console.log(data);
      handler(data);
    });
  }
  _generateMarkup() {}
}

export default new addRecipeView();
