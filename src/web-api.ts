let latency = 200;
let id = 0;

function getId(){
  return ++id;
}

let designs = [
  {
    id:getId(),
    email:'tolkien@inklings.com',
    url:'10115496'
  },
  {
    id:getId(),
    email:'lewis@inklings.com',
    url:'1'
  },
  {
    id:getId(),
    email:'barfield@inklings.com',
    url:'2'
  },
  {
    id:getId(),
    email:'williams@inklings.com',
    url:'12075'
  },
  {
    id:getId(),
    email:'green@inklings.com',
    url:'8675309'
  }
];

export class WebAPI {
  isRequesting = false;

  getDesignList(){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = designs.map(x =>  { return {
          id:x.id,
          url:x.url
        }});
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  getDesigns(id){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = designs.filter(x => x.id == id)[0];
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }

  saveDesign(design){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(design));
        let found = designs.filter(x => x.id == design.id)[0];

        if(found){
          let index = designs.indexOf(found);
          designs[index] = instance;
        }else{
          instance.id = getId();
          designs.push(instance);
        }

        this.isRequesting = false;
        resolve(instance);
      }, latency);
    });
  }
}
