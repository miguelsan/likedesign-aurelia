import {inject} from 'aurelia-framework';
import {Store} from '../models/store';

@inject(Store)

export class Stats {
  store: Store;

  constructor(store){
    this.store = store;
    this.searches = this.store.rows;
    this.totalVotes = this.searches.map(this.voted).reduce(this.addUp, 0);
  }

  deactivate() {
    this.store.reset();
  }

  private voted(search) {
    return (search.likedDesigns.length + search.dislikedDesigns.length);
  }

  private addUp (previousValue, currentValue) {
    return previousValue + currentValue;
  }
}
