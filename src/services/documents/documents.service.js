import DocumentModel from '../../models/Document/document.model';
/**
 * @class Document Service
 *
 */
export default class DocumentService {

  _store = window.localStorage;
  storageKey = 'Documents';
  documents = []

  constructor() {}
  /**
	 * Get documents from API.
	 *
	 */
  async getDocuments() {
    try {
      const response = await fetch('../../../public/documents.json');
      const documents = await response.json();
      this.documents = documents.map(document => new DocumentModel(document)) || [];
    } catch(e) {
      throw new Error(e)
    }
  }
  /**
	 * Create a new document.
	 *
	 * @param {DocumentModel} document document added from the modal
	 */
  postDocument(newDoc) {
    (async() => {
      try {
        await fetch(`${process.env.SERVER_HOST}/document`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newDoc)
        });
      } catch(e) {
        throw new Error(e)
      }
    })();
  }
  /**
	 * Update list of documents
	 *
	 * @param {callback} function the callback that bind with the controller
   *
	 */
  bindDocListChanged(callback) {
    this.onDocListChanged = callback
  }
  /**
	 * Get documents from storage
   *
	 */
  getStoreData() {
    return JSON.parse(this._store.getItem(this.storageKey)|| '[]');
	};
  /**
	 * Save documents in the storage and update list.
	 *
	 * @param {Array} docs Documents to save.
   *
	 */
	setStoreData(docs) {
    this.onDocListChanged(docs);
		this._store.setItem(this.storageKey, JSON.stringify(docs));
	};
  /**
	 * Add document to the storage
	 *
	 * @param {DocumentModel} doc Document to save.
   *
	 */
  addDocument(doc) {
    const document = new DocumentModel(doc);
    this.documents?.push(document);
    this._saveDocument(this.documents);
    this.postDocument(document)
  }
  /**
	 * Call storage handler
	 *
	 * @param {Array} docs Documents to save.
   *
	 */
  async _saveDocument(docs) {
    this.setStoreData(docs);
  }
}