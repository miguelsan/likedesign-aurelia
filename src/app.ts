import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'LikeDesign';
    config.map([
      { route: '',               moduleId: 'no-search',                     title: 'Home' },
      { route: 'results',        moduleId: 'results',     name: 'results',  title: 'Finish' },
      { route: 'designs/:query', moduleId: 'search-list', name: 'designs',  title: 'Search' },
    ]);

    this.router = router;
  }
}
