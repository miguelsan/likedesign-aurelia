import {bindable, bindingMode} from 'aurelia-framework';

export class Design {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) liked = undefined;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.href = data.resources[0].href;
  }
}
