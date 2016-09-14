import {inject} from 'aurelia-framework';
import {Store} from './store';

@inject(Store)

export class Stats {
  store: Store;

  constructor(store){
    this.searches = store.doneSearches;
    this.totalVotes = this.searches.map(this.voted).reduce(this.addUp, 0);
  }

  private voted(search) {
    return (search.likedDesigns.length);
  }

  private addUp (previousValue, currentValue) {
    return previousValue + currentValue;
  }

  //TODO: destroy store values on leave
}
