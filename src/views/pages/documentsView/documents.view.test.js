import { page } from "../../../__Tests__/__mocks__/documents";
import DocumentView from "./documents.view";

describe('Document view test', () => {
  const mockObserve = jest.fn();
  const mockDisconnect = jest.fn();

  const mMutationObserver = {
    observe: mockObserve,
    disconnect:mockDisconnect
  };

  const mockMutationObserver = jest.fn().mockImplementation(() => mMutationObserver);

  beforeAll(() => {
    global.window = page.window;
    global.MutationObserver = mockMutationObserver;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should instantiate view without errors', () => {
    const view = new DocumentView();

    expect(view).toBeDefined();
  });

  it('should call create observer on show modal', () => {
    const view = new DocumentView();

    view.showModal();

    expect(mockMutationObserver).toHaveBeenCalledTimes(1);
  });

  it('should call the createElement fn from the document', () => {
    const createElementSpy = jest.spyOn(document, 'createElement');
    new DocumentView();

    expect(createElementSpy).toHaveBeenCalled();
  });

  it('should call the getElementById fn from the document', () => {
    const elementByIdSpy = jest.spyOn(document, 'getElementById');
    new DocumentView();

    expect(elementByIdSpy).toHaveBeenCalled();
  });

  it('should call the getElementById fn from the document', () => {
    const elementByIdSpy = jest.spyOn(document, 'getElementById');
    new DocumentView();

    expect(elementByIdSpy).toHaveBeenCalled();
  });

  it('should element container main wrapper', () => {
    const view = new DocumentView();
    const rootElement = page.window.document.querySelector('#root');
    rootElement.innerHTML = view.mainContainer;

    expect(rootElement.childNodes.length).toBe(1);
  });
});