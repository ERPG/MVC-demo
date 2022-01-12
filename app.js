import DocumentService from "./src/services/documents/documents.service";
import DocumentView from "./src/views/pages/documentsView/documents.view";
import DocumentController from "./src/controllers/Documents/document.controller";

const loadApp = async () => {
  const documentView = new DocumentView();
  const documentService = new DocumentService();
  await documentService.getDocuments();
  /**
   * @type {Controller}
   */
  new DocumentController(documentService, documentView)
}

// Listen on hash change:
window.addEventListener('hashchange', loadApp);
// Listen on page load:
window.addEventListener('load', loadApp);