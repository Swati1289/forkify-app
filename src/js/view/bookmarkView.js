import View from './View';
import icon from 'url:../../img/icons.svg';
import previewView from './previewView';

class bookmarkView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errMessage = 'No Bookmarks yet find a nice recipe and book mark it :)';
  _message = '';

  addHandler(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
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
export default new bookmarkView();
