export class Store {
  constructor(){
    this.reset();
  }

  addRow(row) {
    this.rows.push(row);
  }

  reset() {
    this.rows = [];
  }
}
