import {EventAggregator} from 'aurelia-event-aggregator';
// import {DesignVoted,SearchViewed} from './messages';

export class Search {
  designs = [];

  constructor(searchQuery: String){
    this.searchQuery = searchQuery;
  }

  // select(contact){
  //   this.selectedId = contact.id;
  //   return true;
  // }

}
