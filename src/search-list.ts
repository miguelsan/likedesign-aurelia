import {inject} from 'aurelia-framework';
import {Search} from './search';
import {Router} from 'aurelia-router';
import {Store} from './store';

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
      this.currentSearch = new Search(currentQuery);
      this.store.addRow(this.currentSearch);

      this.searchQuery = '';
      this.router.navigate('designs/'+currentQuery);
    }
  }
}
