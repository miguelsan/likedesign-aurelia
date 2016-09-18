import {inject} from 'aurelia-framework';
import {Store} from '../models/store';

@inject(Store)

export class Stats {
  store: Store;

  constructor(store){
    this.store = store;
    this.searches = this.store.rows;
    this.countLikedSearches();
    this.totalVotes = this.searches.map(this.voted).reduce(this.addUp, 0);
  }

  deactivate() {
    this.store.reset();
  }

  private voted(search) {
    return (search.likedDesigns + search.dislikedDesigns);
  }

  private addUp (previousValue, currentValue) {
    return previousValue + currentValue;
  }

  countLikedSearches() {
    for (let search of this.searches) {
      for (let design of search.designs) {
        switch design.liked {
          case true:
            search.likedDesigns++;
            break;
          case false:
            search.dislikedDesigns++;
          // third case "undefined" does nothing
        }
      }
    }
  }
}
