/* eslint-disable */

import * as React from 'react';
import Session from 'react-session-api';


/**
 * GenericItem
 * @desc Generic type for local state objects.
 * Import to save a needed item to localstorage.
 * @example
 * import GenericItem from './localstate.helper';
 * import UserSchema from './Models/User';
 * const token = ProfileState(
 *    'token', UserSchema
 * )
 * console.log(token.initFromStorage());
 * @type {{
 * init: GenericItem.init,
 * getAll: (function(): {name: string}),
 * set: GenericItem.set,
 * get: (function(*): *),
 * i: {name: string}
 * }}
 */
export default class GenericItem {
  constructor(name, item = {}) {
    this.name = name;
    this.i = item;
  }

  init(item) {
    // return Object.assign(this.i, item);
    this.i = item;
    this.updateStorage();
    return this.i;
  }

  initFromStorage() {
    // if (localStorage.getItem(this.name) === null) {
    //   let temp = this.name;
    //   console.log(this.init({temp: this.i[name]}));
    // } else {

      const item = this.getStorage();
      if (item) {
        this.i = item;
        this.updateSession();
      } else {
        this.updateStorage();
      }
    // }
    return this.i;
  }

  updateStorage() {
    localStorage.setItem(
      this.name, JSON.stringify(this.i),
    );
    Session.set(this.name, this.i);
    return true;
  }

  updateSession() {
    Session.set(this.name, this.i);
    return true;
  }

  get(key) {
    if (this.i[key]) {
      return this.i[key];
    }
    return undefined;
  }

  get all() {
    return this.i;
  };

  getStorage() {
    if (localStorage.getItem(this.name) === null) {
      return undefined;
    }
    return JSON.parse(localStorage.getItem(this.name));
  }

  // set(item) {
  //   console.log(item);
  //   if (type(item) === Array) {
  //     for (const [key, value] of Object.entries(item)) {
  //       if (this.i[key]) {
  //         this.i[key] = value;
  //       }
  //       return undefined;
  //     }
  //   } else {
  //     this.i = item;
  //   }
  //
  //   this.updateStorage();
  //   return this.i;
  //   // this.i = item;
  //   // this.updateStorage();
  //   // return this.i;
  // }
}

/* eslint-disable valid-jsdoc */
/**
 * _formatted
 * @param item {object}
 * @return {string}
 * @private
 */
export function _formatted(item = {}) {
  return JSON.stringify(item, undefined, 2);
}
