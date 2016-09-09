import {HttpClient} from 'aurelia-http-client';

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
    .get('?query=' + query + '&mediaType=json')
    .then(response => { this.designs = response.content; })
  }

  select(design){
    this.selectedId = design.id;
    return true;
  }
}
