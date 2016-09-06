import {HttpClient} from 'aurelia-http-client';

export class DesignList {
  routeConfig;
  designs = [];
  selectedId = 0;

  activate(params, routeConfig){
    this.routeConfig = routeConfig;
    this.fetchSearch(params.query, this.parseDesigns);
  }

  private parseDesigns(xmlString) {
    var parsed = new DOMParser()
      .parseFromString(xmlString, "application/xml");
    return $(parsed).find('design resource');
  }

  private fetchSearch(query, xmlParser) {
    new HttpClient()
    .configure(config => {
      config
      .withResponseType('xml')
      .withBaseUrl('https://api.spreadshirt.net/api/v1/shops/205909/designs')
    })
    .get('?query=' + query)
    // Due to Aurelia's bug: https://github.com/aurelia/http-client/issues/129,
    // we can't do the following:
    .then(response => { this.designs = xmlParser(response); })
  }

  select(design){
    this.selectedId = design.id;
    return true;
  }
}
