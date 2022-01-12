import EventsService from "./events.service";

describe('Events service test', () => {
  const mockOnOpenFn = jest.fn();
  const mockOnErrorFn = jest.fn();

  const mEventSourceInstance = {
    onopen: mockOnOpenFn,
    onerror:mockOnErrorFn
  };

  const mockEventSource = jest.fn().mockImplementation(() => mEventSourceInstance);

  beforeAll(() => {
    jest.resetModules();
    process.env.SERVER_HOST = 'fake-domain';
    window.EventSource = mockEventSource;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should instantiate service without error', () => {
    const service = new EventsService();
    expect(service).toBeDefined();
  });

  it('should call EventSource constructor', () => {
    new EventsService();
    expect(mockEventSource).toHaveBeenCalledTimes(1);
    expect(mockEventSource).toBeCalledWith('fake-domain/events');
  });
});