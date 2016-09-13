import {bindable, bindingMode} from 'aurelia-framework';

export class DesignList {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) designs;
}
