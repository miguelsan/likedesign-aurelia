export class Design {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.href = data.resources[0].href;
  }
}
