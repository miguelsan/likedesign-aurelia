import {WebAPI} from './web-api';
import {inject} from 'aurelia-framework';

@inject(WebAPI)
export class DesignList {
  designs;
  selectedId = 0;

  constructor(private api: WebAPI) { }

  created(){
    this.api.getDesignList().then(designs => this.designs = designs);
  }

  select(design){
    this.selectedId = design.id;
    return true;
  }
}
