import DocumentService from "./documents.service";

describe('Document service test', () => {

  it('should instatiate service without error', () => {
    const service = new DocumentService();
    expect(service).toBeDefined();
   });
});