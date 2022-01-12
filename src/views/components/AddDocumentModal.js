/**
 * @class Modal component
 *
 */
export default class AddDocumentModal {

  constructor() {
    this.modalContainer = this.createElement('div', 'add-document__container');
    this.modalContainer.classList.add('hidden');
    this.setComponent();
  }

  createElement(tag, className) {
    const element = document.createElement(tag)

    if (className) element.classList.add(className)

    return element
  }

  setComponent() {
    let view =  /*html*/`
      <div data-testid="doc-add-document-modal" class="add-document__dark-layout"></div>
      <div id="add-document-modal" class="add-document__modal">
        <span class="add-document__close">X</span>
        <form action="" class="add-document__modal-content">
          <h3 class="add-document__modal-title">Add a document</h3>
          <div class="add-document__title-container">
            <input data-testid="doc-add-document-modal-input" id="add-document__title-input" class="add-document__title-input" type="text" name="doc-title" placeholder="Document title" autofocus>
          </div>
          <button id="submit" data-testid="doc-add-document-modal-button">Add document</button>
        </form>
      </div>
    `;
    this.modalContainer.innerHTML = view;
    const root = document.getElementById('root');
    if(root) {
      root.prepend(this.modalContainer);
    }
  }
}