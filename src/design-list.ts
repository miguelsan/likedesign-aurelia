import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

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
    .then(data => { this.designs = data.designs })
  }

  select(design){
    this.selectedId = design.id;
    return true;
  }
}
