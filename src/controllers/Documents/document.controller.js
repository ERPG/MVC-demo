import EventsService from "../../services/events/events.service";

export default class DocumentController {
  	/**
	 * @param  {!documentService} documentService The service that manage the documents
	 * @param  {!documentView} documentView The documents view
	 */
  constructor(documentService, documentView) {
    this.documentService = documentService;
    this.eventsService = new EventsService();
    this.documentView = documentView;

    this.documentService.bindDocListChanged(this.onDocListChanged.bind(this))
    this.documentView.addDocument(this.handleAddDocument.bind(this));

    this.onDocListChanged(this.documentService.documents);

    this.addServerEventsListener();
  }
  /**
	 * Listen to documents.
	 *
	 * @param {Array} documents Array of documents
	 */
  onDocListChanged(docs) {
    this.documentView.displayDocuments(docs)
  }
  /**
	 * Show modal on server event listener
	 *
	 */
  addServerEventsListener() {
    const eventsNotification = this.eventsService.notifications;
    if(eventsNotification) {
      eventsNotification.onmessage = (e) => {
        const document = JSON.parse(e.data);
        if(document.title) {
          this.documentView.showToast(document.title);
        }
      };
    }
  }
  /**
	 * Save new document in the store.
	 * ? Some Properties of the document have been mocked..
	 * @param {string} title the title of the created document
	 */
  handleAddDocument(title) {
    const document = {
      "Attachments": [
          "European Amber Lager",
          "Wood-aged Beer"
      ],
      "Contributors": [
          {
              "ID": "1b41861e-51e2-4bf4-ba13-b20f01ce81ef",
              "Name": "Jasen Crona"
          },
          {
              "ID": "2a1d6ed0-7d2d-4dc6-b3ea-436a38fd409e",
              "Name": "Candace Jaskolski"
          },
          {
              "ID": "9ae28565-4a1c-42e3-9ae8-e39e6f783e14",
              "Name": "Rosemarie Schaden"
          }
      ],
      "CreatedAt": "1912-03-08T06:01:39.382278739Z",
      "ID": "69517c79-a4b2-4f64-9c83-20e5678e4519",
      "Title": "Arrogant Bastard Ale",
      "UpdatedAt": "1952-02-29T22:21:13.817038244Z",
      "Version": "5.3.15"
    };
    const newDoc = {...document, Title: title };
    this.documentService.addDocument(newDoc);
  };

}