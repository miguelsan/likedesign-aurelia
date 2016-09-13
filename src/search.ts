import {EventAggregator} from 'aurelia-event-aggregator';
// import {DesignVoted,SearchViewed} from './messages';
// Temporarily fix https://github.com/aurelia/fetch-client/issues/65 with:
/// <reference path="../node_modules/aurelia-fetch-client/doc/whatwg-fetch.d.ts" />
import {HttpClient} from 'aurelia-fetch-client';
import {Design} from './design';

export class Search {
  designs = [];

  constructor(searchQuery: String){
    this.searchQuery = searchQuery;
    this.fetchSearch();
  }

  // created(){
  //   this.api.getContactList().then(contacts => this.contacts = contacts);
  // }
  // 
  // select(contact){
  //   this.selectedId = contact.id;
  //   return true;
  // }

  private fetchSearch() {
    new HttpClient()
    .configure(config => { config
      .withBaseUrl('https://api.spreadshirt.net/api/v1/shops/205909/designs')
    })
    .fetch('?query=' + this.searchQuery + '&mediaType=json')
    .then(response => response.json())
    .then(data => {
      for (let design of data.designs) {
        this.designs.push(new Design(design))
      }
    })
  }
}
