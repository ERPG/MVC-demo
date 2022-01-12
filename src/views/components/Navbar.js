/**
 * @class Navbar component
 *
 */
export default class Navbar {

  constructor() {
    this.setComponent();
  }

  setComponent() {
    const component =  /*html*/`
    <div class="wrapper">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar__container">
          <h1 navbar__title>Documents</h1>
          <div class="navbar__filters"></div>
        </div>
        <div class="navbar__container">
          <div class="nav__layout-order">
            <span class="nav__layout-square btn btn-primary">
              <i class="fas fa-th-large"></i>
            </span>
            <span class="nav__layout-linear btn btn-primary">
              <i class="fas fa-align-justify"></i>
            </span>
          </div>
          <div class="document-header hidden">
            <p class="document-header__name">Name</p>
            <p class="document-header__contributors-title">Contributors</p>
            <p class="document-header__attachments-title">Attachments</p>
        </div>
        </div>
      </nav>
    </div>
    `;
    const rootElement = document.getElementById('root');
    const node = new DOMParser().parseFromString(component, 'text/html');
    if(rootElement) {
      rootElement.prepend(node.body.firstChild);
      this.addButtonsListeners();
    }
  }

  addButtonsListeners() {
    const squareLayoutBtn = document.querySelector('.nav__layout-square');
    const linearLayoutBtn = document.querySelector('.nav__layout-linear');

    squareLayoutBtn.addEventListener('click', this.addLayoutClasses)
    linearLayoutBtn.addEventListener('click', this.removeLayoutClasses)
  }

  addLayoutClasses() {
    document.querySelector('.document-header').classList.add('hidden');
    document.querySelectorAll('.document__contributors-title').forEach(elem => elem.classList.remove('hidden'));
    document.querySelectorAll('.document__attachments-title').forEach(elem => elem.classList.remove('hidden'));
    const documentList = document.querySelector('.documents__list');
    const documentEl = document.querySelectorAll('.document-item');
    documentList.classList.add('square-grid');
    documentEl.forEach(elem => elem.classList.remove('line-grid-item'));
  }

  removeLayoutClasses() {
    document.querySelector('.document-header').classList.remove('hidden');
    document.querySelectorAll('.document__contributors-title').forEach(elem => elem.classList.add('hidden'));
    document.querySelectorAll('.document__attachments-title').forEach(elem => elem.classList.add('hidden'));
    const documentList = document.querySelector('.documents__list');
    const documentEl = document.querySelectorAll('.document-item');
    documentList.classList.remove('square-grid');
    documentEl.forEach(elem => elem.classList.add('line-grid-item'));
  }
}