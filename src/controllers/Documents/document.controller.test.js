import DocumentService from '../../services/documents/documents.service';
import EventsService from '../../services/events/events.service.js';
import DocumentView from '../../views/pages/documentsView/documents.view';
import DocumentController from './document.controller';

jest.mock('../../services/documents/documents.service');
jest.mock('../../services/events/events.service.js');
jest.mock('../../views/pages/documentsView/documents.view');

describe('Document Controller test', () => {
  const mockDocumentService = new DocumentService();
  const mockDocumentView = new DocumentView();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should instantiate controller and dependencies without errors', () => {
    const controller = new DocumentController(mockDocumentService, mockDocumentView);

    expect(mockDocumentService).toBeDefined();
    expect(mockDocumentView).toBeDefined();
    expect(controller).toBeDefined();
  });

  it('should call the server events service', () => {
    new DocumentController(mockDocumentService, mockDocumentView);
    expect(EventsService).toHaveBeenCalled();
  });

  it('should bind to document change on service', () => {
    const mockBindListChange = jest.spyOn(mockDocumentService, 'bindDocListChanged');

    new DocumentController(mockDocumentService, mockDocumentView);

    expect(mockBindListChange).toHaveBeenCalledTimes(1);
  });

  it('should call addDocument view method', () => {
    const mockDisplayDocuments = jest.spyOn(mockDocumentView, 'addDocument');

    new DocumentController(mockDocumentService, mockDocumentView);

    expect(mockDisplayDocuments).toHaveBeenCalledTimes(1);
  });

  it('should call displayDocuments view method', () => {
    const mockDisplayDocuments = jest.spyOn(mockDocumentView, 'displayDocuments');

    new DocumentController(mockDocumentService, mockDocumentView);

    expect(mockDisplayDocuments).toHaveBeenCalledTimes(1);
  });
});