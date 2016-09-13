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
  currentDesignsList = [];
  // selectedId = 0;

  constructor(router){
    this.router = router;
  }

  addSearch() {
    var query = this.searchQuery
    if (query) {
      var currentSearch = new Search(query);
      this.searches.push(currentSearch);

      this.currentDesignsList = currentSearch.designs;
      this.searchQuery = '';
      this.router.navigate('designs/'+query);
    }
  }

  // select(design){
  //   this.selectedId = design.id;
  //   return true;
  // }
}
