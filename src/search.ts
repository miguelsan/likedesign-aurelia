import {EventAggregator} from 'aurelia-event-aggregator';
// import {DesignVoted,SearchViewed} from './messages';

export class Search {
  designs = [];

  constructor(searchQuery: String){
    this.searchQuery = searchQuery;
  }

  // created(){
  //   this.api.getContactList().then(contacts => this.contacts = contacts);
  // }
  // 
  // select(contact){
  //   this.selectedId = contact.id;
  //   return true;
  // }

}
