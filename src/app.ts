import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'LikeDesign';
    config.map([
      { route: '',               moduleId: 'no-search',     title: 'search' },
      { route: 'designs/:query', moduleId: 'design-list',   name:  'designs' },
      { route: 'results',        moduleId: 'results',       title: 'results' }
    ]);

    this.router = router;
  }
}
