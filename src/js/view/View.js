import icon from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    /*if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();*/
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElement = Array.from(newDOM.querySelectorAll('*'));
    const curElement = Array.from(this._parentEl.querySelectorAll('*'));

    //console.log(newElement);

    newElement.forEach((newEl, i) => {
      const curEl = curElement[i];
      //update changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        
        curEl.textContent = newEl.textContent;
      }
      //update changed attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  _clear() {
    this._parentEl.innerHTML = '';
  }
  renderSpinner() {
    const markup = `<div class="spinner">
        <svg>
          <use href="${icon}#icon-loader"></use>
        </svg>
      </div>
        `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errMessage) {
    const markup = `<div class="error">
          <div>
            <svg>
              <use href="${icon}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message) {
    console.log(message);
    const markup = `<div class="message">
        <div>
          <svg>
            <use href=""></use>
          </svg>
        </div>
        <p>${this._message}</p>
      </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
