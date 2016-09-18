export class Store {
  rows = [];

  constructor(){
    this.reset();
  }

  addRow(row) {
    this.rows.push(row);
  }

  // Move a row to the end of the list
  dropRow(row) {
    const index = this.rows.indexOf(row);
    this.rows.splice(index,1);
    this.rows.push(row);
  }

  find(criteria) {
    const found = this.rows.filter(criteria);
    return found;
  }

  reset() {
    this.rows = [];
  }
}
