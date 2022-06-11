import View from './View';
import icon from 'url:../../img/icons.svg';
import { state } from '../model';

class Pagination extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const button = e.target.closest('.btn--inline');
      // console.log(button);
      if (!button) return;
      const gotoPage = +button.dataset.got;

      handler(gotoPage);
      // console.log(gotoPage);
    });
  }
  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultperPage
    );
    //console.log(numPages);
    //1st page and having more pages
    if (currentPage == 1 && numPages > 1) {
      return `
      <button data-got="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
     </button>
      `;
    }
    //on last page
    if (currentPage === numPages && numPages > 1) {
      return `
      <button data-got="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
     </button>
      `;
    }
    if (currentPage < numPages) {
      return `
     <button  data-got="${
       currentPage - 1
     }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
     </button>
     <button  data-got="${
       currentPage + 1
     }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icon}#icon-arrow-right"></use>
        </svg>
     </button>`;
    }
    return '';
  }
}

export default new Pagination();
