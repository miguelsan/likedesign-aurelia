export class Store {
  constructor(){
    this.doneSearches = [];
  }

  addSearch(search) {
    this.doneSearches.push(search);
  }
}
