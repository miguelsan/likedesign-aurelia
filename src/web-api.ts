let latency = 200;
let id = 0;

function getId(){
  return ++id;
}

let searchs = [
  {
    id:getId(),
    email:'tolkien@inklings.com',
    phoneNumber:'10115496'
  },
  {
    id:getId(),
    email:'lewis@inklings.com',
    phoneNumber:'1'
  },
  {
    id:getId(),
    email:'barfield@inklings.com',
    phoneNumber:'2'
  },
  {
    id:getId(),
    email:'williams@inklings.com',
    phoneNumber:'12075'
  },
  {
    id:getId(),
    email:'green@inklings.com',
    phoneNumber:'8675309'
  }
];

export class WebAPI {
  isRequesting = false;

  getSearchList(){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = searchs.map(x =>  { return {
          id:x.id,
          firstName:x.firstName,
          lastName:x.lastName,
          email:x.email
        }});
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  getSearchs(id){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = searchs.filter(x => x.id == id)[0];
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }

  saveSearch(search){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(search));
        let found = searchs.filter(x => x.id == search.id)[0];

        if(found){
          let index = searchs.indexOf(found);
          searchs[index] = instance;
        }else{
          instance.id = getId();
          searchs.push(instance);
        }

        this.isRequesting = false;
        resolve(instance);
      }, latency);
    });
  }
}
