/**
 * @class Server Events instance
 *
 */
export default class EventsService {

  TIMEOUT = 30000;

  constructor() {
    this.notifications = new EventSource(`${process.env.SERVER_HOST}/events`);
    this.notifications.onopen = () => this.onOpenCallBack();
    this.notifications.onerror = () => this.onErrorCallBack();
  }
  /**
	 * handle the open connection to the server
	 *
	 */
  onOpenCallBack() {
    clearTimeout(this.EvenTimeOut);
  }
  /**
	 * Handle the errors on connections
	 *
	 */
  onErrorCallBack() {
    if(!this.EvenTimeOut) {
      this.EvenTimeOut = setTimeout(() => {
        this.notifications.close();
      }, this.TIMEOUT);
    }
  };
}