import { Injectable } from '@angular/core';

@Injectable()
export class PubSubService {
  subUid: any;
  topics: any;
  constructor() {
    this.subUid =  -1;
    this.topics =  {};
  }

  subscribe(topic: string, callback, once?) {
    const token = (this.subUid += 1);
    const obj = {
      token: undefined,
      callback: undefined,
      once: undefined,
    };

    if (typeof callback !== 'function') {
      throw new TypeError(
        'When subscribing for an event, a callback function must be defined.'
      );
    }

    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }

    obj.token = token;
    obj.callback = callback;
    obj.once = !!once;

    this.topics[topic].push(obj);

    return token;
  }

  subscribeOnce(topic: string, callback) {
    return this.subscribe(topic, callback, true);
  };

  /**
     * Publish or broadcast events of interest with a specific
     * topic name and arguments such as the data to pass along.
     *
     * @this {PubSub}
     * @param {String} topic The topic's name.
     * @param {*} [data] The data to be passed.
     * @return {Boolean} True if topic exists and event is published; otherwise false.
     */
  publish(topic: string, data?) {
    let len, subscribers, currentSubscriber, token;

    if (!this.topics[topic]) {
      return false;
    }

    setTimeout(() => {
      subscribers = this.topics[topic];
      len = subscribers ? subscribers.length : 0;

      while (len) {
        len -= 1;
        token = subscribers[len].token;
        currentSubscriber = subscribers[len];

        currentSubscriber.callback(data, {
          name: topic,
          token: token
        });

        // Unsubscribe from event based on tokenized reference,
        // if subscriber's property once is set to true.
        if (currentSubscriber.once === true) {
          this.unsubscribe(token);
        }
      }
    }, 0);

    return true;
  }

  /**
     * Unsubscribe from a specific topic, based on the topic name,
     * or based on a tokenized reference to the subscription.
     *
     * @this {PubSub}
     * @param {String|Object} topic Topic's name or subscription referenece.
     * @return {Boolean|String} False if `topic` does not match a subscribed event, else the topic's name.
     */
  unsubscribe(topic: string) {
    let tf = false,
      prop,
      len;

    for (let prop in this.topics) {
      if (Object.hasOwnProperty.call(this.topics, prop)) {
        if (this.topics[prop]) {
          len = this.topics[prop].length;

          while (len) {
            len -= 1;

            // If t is a tokenized reference to the subscription.
            // Removes one subscription from the array.
            if (this.topics[prop][len].token === topic) {
              this.topics[prop].splice(len, 1);
              return topic;
            }

            // If t is the event type.
            // Removes all the subscriptions that match the event type.
            if (prop === topic) {
              this.topics[prop].splice(len, 1);
              tf = true;
            }
          }

          if (tf === true) {
            return topic;
          }
        }
      }
    }

    return false;
  }
}
