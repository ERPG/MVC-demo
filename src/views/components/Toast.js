/**
 * @class Toast component
 *
 */
export default class Toast {

  constructor(documentTitle) {
    this.documentTitle = documentTitle;
    this.setComponent();
  }

  setComponent() {
    const component =  /*html*/`
    <div id="snackbar" class="toast">
      <i class="fas fa-bell"></i>
      <p class="toast__text">New Document ${this.documentTitle} added</p>
    </div>
    `;
    const rootElement = document.getElementById('root');
    const node = new DOMParser().parseFromString(component, 'text/html');
    if(rootElement) {
      rootElement.prepend(node.body.firstChild);
      this.removeToast()
    }
  }

  removeToast() {
    const toast = document.getElementById('snackbar');
    if(toast) {
      toast.className = "show";
      setTimeout(() => toast.remove(), 4500);
    }
  }
}