import { EventEmitter, EventSubscription } from 'fbemitter';

class EventManager {
  private emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  /**
   * Subscribe to an event.
   * @param eventName - The name of the event.
   * @param callback - The callback function to execute when the event is triggered.
   * @returns An EventSubscription instance that can be used to remove the listener.
   */
  subscribe<T>(eventName: string, callback: (payload: T) => void): EventSubscription {
    return this.emitter.addListener(eventName, callback);
  }

  /**
   * Emit an event.
   * @param eventName - The name of the event.
   * @param payload - The data to pass with the event.
   */
  emit<T>(eventName: string, payload: T): void {
    this.emitter.emit(eventName, payload);
  }

  /**
   * Remove all listeners for a specific event.
   * @param eventName - The name of the event.
   */
  removeAllListeners(eventName: string): void {
    this.emitter.removeAllListeners(eventName);
  }
}

export default new EventManager();
