// import {EventAggregator} from 'aurelia-event-aggregator';
// import {DesignsVoted, DesignsViewed} from './messages';
import {inject} from 'aurelia-framework';
import {Search} from './search';
import {Router} from 'aurelia-router';

// @inject(EventAggregator)
@inject(Router)

export class SearchList {
  heading = "Searches";
  searchQuery = '';
  searches = [];
  // selectedId = 0;
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

  // select(design){
  //   this.selectedId = design.id;
  //   return true;
  // }
}
