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

  constructor(router){
    this.router = router;
  }

  addSearch() {
    var query = this.searchQuery
    if (query) {
      this.searches.push(new Search(query));
      this.searchQuery = '';
      this.router.navigate('designs/'+query);
    }
  }

  // select(design){
  //   this.selectedId = design.id;
  //   return true;
  // }
}
