
import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {SearchUpdated, SearchViewed} from './messages';
import {inject} from 'aurelia-framework';

@inject(WebAPI, EventAggregator)
export class SearchList {
  searchs;
  selectedId = 0;

  constructor(private api: WebAPI, ea: EventAggregator){
    ea.subscribe(SearchViewed, msg => this.select(msg.search));
    ea.subscribe(SearchUpdated, msg => {
      let id = msg.search.id;
      let found = this.searchs.find(x => x.id == id);
      Object.assign(found, msg.search);
    });
  }

  created(){
    this.api.getSearchList().then(searchs => this.searchs = searchs);
  }

  select(search){
    this.selectedId = search.id;
    return true;
  }
}
