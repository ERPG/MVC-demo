/**
 * @class Document Event Model
 *
 */

export default class DocumentEvent {
  constructor({ Timestamp, UserID, UserName, DocumentID, DocumentTitle }) {
    this._userId = UserID;
    this.timeStamp = Timestamp;
    this.username = UserName;
    this.documentId = DocumentID;
    this.documentTitle = DocumentTitle;
  }
}