import Navbar from '../../components/Navbar';
import AddDocumentModal from '../../components/AddDocumentModal';
import Toast from '../../components/Toast';

/**
 * @class Document view
 *
 */
export default class DocumentView {

  constructor() {
    this.createMainContainers();
    this.setView();
    this.addComponents();
    this.addModalListeners();
    this.observer = this.createObserver();
  }

  createMainContainers() {
    this.mainContainer = this.createElement('div', 'main');
    this.mainContainer.setAttribute('data-testid', 'doc-main-container');
    this.documentsListWrapper = this.createElement('ul', 'documents__list');
    this.mainContainer.setAttribute('data-testid', 'doc-documents-list');
  }

  addComponents() {
    new Navbar();
    new AddDocumentModal();
  }

  createElement(tag, className) {
    const element = document.createElement(tag)

    if (className) element.classList.add(className)

    return element
  }

  addModalListeners() {
    this.inputTitle  = document.querySelector("#add-document__title-input");
    this.modalContainer = document.querySelector(".add-document__container");
    const closeButton = document.querySelector(".add-document__close");

    if(this.inputTitle) {
      this.inputTitle.addEventListener('input', (e) => this.documentTitle = e.target.value);
        closeButton.addEventListener('click', () => {
        this.modalContainer.classList.add('hidden');
        this.observer.disconnect();
        closeButton.removeEventListener('click', () => this.showModal());
      });
    }
  }
	/**
	 * Create a new document
	 *
	 * @param {!function} handler Bind to controller method
	 */
  addDocument(handler) {
    const formListener = document.querySelector("form");
    if(formListener) {
      formListener.addEventListener('submit', (e) => {
        e.preventDefault();
        if (this.documentTitle) {
          handler(this.documentTitle);
          this.inputTitle.value = '';
          this.modalContainer.classList.add('hidden');
          this.observer.disconnect();
        }
      });
    }
	}
	/**
	 * Display document list
	 *
	 * @param {!Array} docItems Documents array from store
	 */
  displayDocuments(docItems) {
		const documents = docItems.map((document, index) => `
      <li data-id="${document._id}" class="document-item">
        <div class="document__description">
          <h3 class="document__title">${document.title}</h3>
          <span class="document__version">Version ${document.version}</span>
        </div>
        <div class="document__contributors">
          <p class="document__contributors-title">Contributors</p>
          ${document.contributors?.map(elem =>
            `<span class="document__contributor">${elem.Name}</span>`
          ).join(" ")}
        </div>
        <div class="document__attachments">
          <p class="document__attachments-title">Attachments</p>
          ${document.attachments?.map(elem =>
            `<span class="document__attachment">${elem}</span>`
          ).join(" ")}
        </div>
      </li>
      ${docItems.length - 1 === index || docItems.length === 0 ?
        `<li class="document-item">
          <div class="document__add-container">
            <span class="document__add" data-testid="doc-add-document-button">+ Add document</span>
          </div>
        </li>` : ''}`, '');

    this.documentsListWrapper.innerHTML = documents.join(" ");
    this.documentsListWrapper.classList.add('square-grid');
	}

  showModal() {
    const modal = document.querySelector('.add-document__container');
    if(modal) {
      modal.classList.remove('hidden');
      this.observer = this.createObserver();
    }
  }
	/**
	 * Show toast on event notification
	 *
	 * @param {!string} title the title of the new document.
	 */
  showToast(title) {
    return new Toast(title);
  }

  addDocListener() {
    const addButton = document.querySelector('.document__add');
    if(addButton){
      addButton.addEventListener('click', () => this.showModal());
    }
  }

  createObserver() {
    const observer = new MutationObserver(() => this.addDocListener());
    const docList = document.querySelector('.documents__list');
    const observerOptions = { childList: true };
    if(docList) {
      observer.observe(docList, observerOptions);
      return observer;
    }
    return false;
  }

  setView () {
    const rootElement = document.getElementById('root');
    this.mainContainer.appendChild(this.documentsListWrapper);
    if(rootElement) {
      rootElement.appendChild(this.mainContainer);
    }
  }
}