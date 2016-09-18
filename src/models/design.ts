export class Design {
  liked: Boolean;
  id: String;
  name: String;
  href: String;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.href = data.resources[0].href;
  }
}
