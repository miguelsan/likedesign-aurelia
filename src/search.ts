import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {SearchUpdated,SearchViewed} from './messages';
import {areEqual} from './utility';

interface Search {
  email: string;
}

@inject(WebAPI, EventAggregator)
export class Search {
  routeConfig;
  search: Search;
  originalSearch: Search;

  constructor(private api: WebAPI, private ea: EventAggregator) { }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.api.getSearchs(params.id).then(search => {
      this.search = <Search>search;
      this.routeConfig.navModel.setTitle(this.search.firstName);
      this.originalSearch = JSON.parse(JSON.stringify(this.search));
      this.ea.publish(new SearchViewed(this.search));
    });
  }

  get canSave() {
    return this.search.firstName && this.search.lastName && !this.api.isRequesting;
  }

  save() {
    this.api.saveSearch(this.search).then(search => {
      this.search = <Search>search;
      this.routeConfig.navModel.setTitle(this.search.firstName);
      this.originalSearch = JSON.parse(JSON.stringify(search));
      this.ea.publish(new SearchUpdated(this.search));
    });
  }

  canDeactivate() {
    if (!areEqual(this.originalSearch, this.search)) {
      let result = confirm('You have unsaved changes. Are you sure you wish to leave?');

      if (!result) {
        this.ea.publish(new SearchViewed(this.search));
      }

      return result;
    }

    return true;
  }
}
