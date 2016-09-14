export class Store {
  constructor(){
    this.reset();
  }

  addSearch(search) {
    this.doneSearches.push(search);
  }

  reset() {
    this.doneSearches = [];
  }
}
