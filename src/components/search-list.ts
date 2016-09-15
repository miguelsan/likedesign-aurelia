import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Store} from '../models/store';
import {Search} from '../models/search';

@inject(Router, Store)

export class SearchList {
  router: Router;
  store: Store;
  searchQuery = '';
  searches = [];

  constructor(router, store){
    this.router = router;
    this.store = store;
    this.searches = this.store.rows;
    this.currentSearch = undefined;
  }

  addSearch() {
    var currentQuery = this.searchQuery;
    if (currentQuery) {
      const repeatedSearch = this.findSearch(currentQuery);
      if (repeatedSearch) {
        this.store.dropRow(repeatedSearch);
        this.currentSearch = repeatedSearch;
      } else {
        this.currentSearch = new Search(currentQuery);
        this.store.addRow(this.currentSearch);
      }
      this.searchQuery = '';
      this.router.navigate('designs/' + currentQuery);
    }
  }

  private findSearch(query) {
    const found = this.store.find( search => { return search.searchQuery == query });
    if (found.length != 0) {
      return found[0];
    }
  }
}
