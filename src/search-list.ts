import {inject} from 'aurelia-framework';
import {Search} from './search';
import {Router} from 'aurelia-router';

@inject(Router)

export class SearchList {
  searchQuery = '';
  searches = [];
  currentSearch = undefined;

  constructor(router){
    this.router = router;
  }

  addSearch() {
    var currentQuery = this.searchQuery
    if (currentQuery) {
      this.currentSearch = new Search(currentQuery);
      this.searches.push(this.currentSearch);

      this.searchQuery = '';
      this.router.navigate('designs/'+currentQuery);
    }
  }
}
