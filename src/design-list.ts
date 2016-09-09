import {HttpClient} from 'aurelia-fetch-client';

export class DesignList {
  routeConfig;
  designs = [];
  selectedId = 0;

  activate(params, routeConfig){
    this.routeConfig = routeConfig;
    this.fetchSearch(params.query, this.parseDesigns);
  }

  private fetchSearch(query, xmlParser) {
    new HttpClient()
    .configure(config => {
      config
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
