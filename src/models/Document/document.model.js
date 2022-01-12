/**
 * @class Document Model
 *
 */
export default class DocumentModel {
    constructor({ ID, CreatedAt, Title, Version, Contributors, Attachments, UpdatedAt }) {
    this._id = ID;
    this.title = Title;
    this.version = Version;
    this.contributors = Contributors;
    this.attachments = Attachments;
    this.createdAt = CreatedAt;
    this.updatedAt = UpdatedAt;
  }
}