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
      // there is also the possibility to fetch the payload as json, &mediaType=json,
      // see https://developer.spreadshirt.net/display/API/Client-Server+Communication
    .get('?query=' + query)
    // you are passing the HttpResponseMessage to the xmlParser and not the xmlString like the parameter is named
    .then(response => { this.designs = xmlParser(response.content); })
  }

  select(design){
    this.selectedId = design.id;
    return true;
  }
}
