import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'LikeDesign';
    config.map([
      { route: '',        moduleId: 'home',        name: 'home',     title: 'Home' },
      { route: 'designs', moduleId: 'search-list', name: 'designs',  title: 'Search' },
      { route: 'results', moduleId: 'stats',       name: 'results',  title: 'Finish' },
    ]);

    this.router = router;
  }
}
