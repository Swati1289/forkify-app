import View from './View';
import previewView from './previewView';
import icon from 'url:../../img/icons.svg';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errMessage = 'No recipe found for your query!! Please try again';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
  /*_generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
            <a class="preview__link ${
              result.id === id ? 'preview__link--active' : ''
            } " href=#${result.id}>
              <figure class="preview__fig">
                <img src=${result.image} alt=${result.title} />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
          </li>
      `;
  }*/
}
export default new ResultView();
