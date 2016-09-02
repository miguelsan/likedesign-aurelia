import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'LikeDesign';
    config.map([
      { route: '',            moduleId: 'no-search',     title: 'search' },
      { route: 'searchs/:id', moduleId: 'search',        name:  'searchs' }
    ]);

    this.router = router;
  }
}
