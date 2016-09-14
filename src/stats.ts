import {inject} from 'aurelia-framework';
import {Store} from './store';

@inject(Store)

export class Stats {
  store: Store;

  constructor(store){
    this.searches = store.doneSearches;
  }
}
