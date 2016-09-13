// Temporarily fix https://github.com/aurelia/fetch-client/issues/65 with:
/// <reference path="../node_modules/aurelia-fetch-client/doc/whatwg-fetch.d.ts" />
import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Design} from './design';

@autoinject
export class DesignList {
  routeConfig;
  designs = [];
  selectedId = 0;

  constructor(private http: HttpClient) {}

  activate(params, routeConfig){
    this.routeConfig = routeConfig;
    this.fetchSearch(params.query, this.parseDesigns);
  }

  private fetchSearch(query, xmlParser) {
    this.http
    .configure(config => { config
      .withBaseUrl('https://api.spreadshirt.net/api/v1/shops/205909/designs')
    })
    .fetch('?query=' + query + '&mediaType=json')
    .then(response => response.json())
    .then(data => {
      for (let design of data.designs) {
        this.designs.push(new Design(design))
      }
    })
  }

  select(design){
    this.selectedId = design.id;
    return true;
  }
}
