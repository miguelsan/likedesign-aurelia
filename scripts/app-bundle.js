define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
        }
        App.prototype.configureRouter = function (config, router) {
            config.title = 'LikeDesign';
            config.map([
                { route: '', moduleId: 'home', name: 'home', title: 'Home' },
                { route: 'designs', moduleId: 'search-list', name: 'designs', title: 'Search' },
                { route: 'results', moduleId: 'stats', name: 'results', title: 'Finish' },
            ]);
            this.router = router;
        };
        return App;
    }());
    exports.App = App;
});

define('design',["require", "exports"], function (require, exports) {
    "use strict";
    var Design = (function () {
        function Design(data) {
            this.id = data.id;
            this.name = data.name;
            this.href = data.resources[0].href;
        }
        return Design;
    }());
    exports.Design = Design;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('home',["require", "exports"], function (require, exports) {
    "use strict";
    var home = (function () {
        function home() {
            this.message = "Here you can like (or dislike) some designs.<br/>"
                + "Search after a keyword and vote for them.<br/>"
                + "Don't forget to check your result when you are finished!";
        }
        return home;
    }());
    exports.home = home;
});

define('main',["require", "exports", './environment'], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('no-search',["require", "exports"], function (require, exports) {
    "use strict";
    var NoSearch = (function () {
        function NoSearch() {
            this.message = "Please enter a search query.";
        }
        return NoSearch;
    }());
    exports.NoSearch = NoSearch;
});

define('search',["require", "exports", 'aurelia-fetch-client', './design'], function (require, exports, aurelia_fetch_client_1, design_1) {
    "use strict";
    var Search = (function () {
        function Search(searchQuery) {
            this.designs = [];
            this.likedDesigns = [];
            this.dislikedDesigns = [];
            this.searchQuery = searchQuery;
            this.fetchSearch();
        }
        Search.prototype.fetchSearch = function () {
            var _this = this;
            new aurelia_fetch_client_1.HttpClient()
                .configure(function (config) {
                config
                    .withBaseUrl('https://api.spreadshirt.net/api/v1/shops/205909/designs');
            })
                .fetch('?query=' + this.searchQuery + '&mediaType=json')
                .then(function (response) { return response.json(); })
                .then(function (data) {
                for (var _i = 0, _a = data.designs; _i < _a.length; _i++) {
                    var design = _a[_i];
                    _this.designs.push(new design_1.Design(design));
                }
            });
        };
        return Search;
    }());
    exports.Search = Search;
});

define('store',["require", "exports"], function (require, exports) {
    "use strict";
    var Store = (function () {
        function Store() {
            this.reset();
        }
        Store.prototype.addRow = function (row) {
            this.rows.push(row);
        };
        Store.prototype.dropRow = function (row) {
            var index = this.rows.indexOf(row);
            this.rows.splice(index, 1);
            this.rows.push(row);
        };
        Store.prototype.find = function (criteria) {
            var found = this.rows.filter(criteria);
            return found;
        };
        Store.prototype.reset = function () {
            this.rows = [];
        };
        return Store;
    }());
    exports.Store = Store;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('search-list',["require", "exports", 'aurelia-framework', './search', 'aurelia-router', './store'], function (require, exports, aurelia_framework_1, search_1, aurelia_router_1, store_1) {
    "use strict";
    var SearchList = (function () {
        function SearchList(router, store) {
            this.searchQuery = '';
            this.searches = [];
            this.router = router;
            this.store = store;
            this.searches = this.store.rows;
            this.currentSearch = undefined;
        }
        SearchList.prototype.addSearch = function () {
            var currentQuery = this.searchQuery;
            if (currentQuery) {
                var repeatedSearch = this.findSearch(currentQuery);
                if (repeatedSearch) {
                    this.store.dropRow(repeatedSearch);
                    this.currentSearch = repeatedSearch;
                }
                else {
                    this.currentSearch = new search_1.Search(currentQuery);
                    this.store.addRow(this.currentSearch);
                }
                this.searchQuery = '';
                this.router.navigate('designs/' + currentQuery);
            }
        };
        SearchList.prototype.findSearch = function (query) {
            var found = this.store.find(function (search) { return search.searchQuery == query; });
            if (found.length != 0) {
                return found[0];
            }
        };
        SearchList = __decorate([
            aurelia_framework_1.inject(aurelia_router_1.Router, store_1.Store), 
            __metadata('design:paramtypes', [Object, Object])
        ], SearchList);
        return SearchList;
    }());
    exports.SearchList = SearchList;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('stats',["require", "exports", 'aurelia-framework', './store'], function (require, exports, aurelia_framework_1, store_1) {
    "use strict";
    var Stats = (function () {
        function Stats(store) {
            this.store = store;
            this.searches = this.store.rows;
            this.totalVotes = this.searches.map(this.voted).reduce(this.addUp, 0);
        }
        Stats.prototype.deactivate = function () {
            this.store.reset();
        };
        Stats.prototype.voted = function (search) {
            return (search.likedDesigns.length + search.dislikedDesigns.length);
        };
        Stats.prototype.addUp = function (previousValue, currentValue) {
            return previousValue + currentValue;
        };
        Stats = __decorate([
            aurelia_framework_1.inject(store_1.Store), 
            __metadata('design:paramtypes', [Object])
        ], Stats);
        return Stats;
    }());
    exports.Stats = Stats;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"./styles.css\"></require>\n\n  <nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n    <div class=\"container\">\n      <div class=\"navbar-header\">\n        <a class=\"navbar-brand\" href=\"#\">\n          <i class=\"fa fa-user\"></i>\n          <span>LikeDesign</span>\n        </a>\n      </div>\n    </div>\n  </nav>\n\n  <div class=\"container\">\n    <div class=\"row\">\n      <router-view></router-view>\n    </div>\n  </div>\n\n  <footer class=\"footer\">\n    <div class=\"container\">\n      <p class=\"text-muted\">\n        An application at <a href=\"http://spreadshirt.com/\">Spreadshirt</a><br/>\n        Made with <a href=\"http://aurelia.io\">Aurelia</a> by <a href=\"http://miguelsanmiguel.com\">miguelsanmiguel</a><br/>\n        (c) 2106\n      </p>\n    </div>\n  </footer>\n</template>\n"; });
define('text!styles.css', ['module'], function(module) { module.exports = "html {\n  position: relative;\n  min-height: 100%;\n}\n\nbody {\n  padding-top: 70px;\n  /* Margin bottom by footer height */\n  margin-bottom: 110px;\n}\n\nsection {\n  margin: 0 20px;\n}\n\na:focus {\n  outline: none;\n}\n\n.navbar-nav li.loader {\n    margin: 12px 24px 0 6px;\n}\n\n.no-search {\n  margin: 20px;\n}\n\n.search-list {\n  overflow-y: auto;\n  border: 1px solid #ddd;\n  padding: 10px;\n}\n\n.panel {\n  margin: 20px;\n}\n\n.button-bar {\n  right: 0;\n  left: 0;\n  bottom: 0;\n  border-top: 1px solid #ddd;\n  background: white;\n}\n\n.button-bar > button {\n  float: right;\n  margin: 20px;\n}\n\nul.list-group {\n  margin-bottom: 0px;\n}\n\nli.list-group-item {\n  list-style: none;\n}\n\nli.list-group-item > a {\n  text-decoration: none;\n}\n\nli.list-group-item.active > a {\n  color: white;\n}\n\n.top10 { margin-top:10px; }\n\n.footer {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  /* Set the fixed height of the footer here */\n  height: 100px;\n  background-color: #f5f5f5;\n}\n\n.footer > .container {\n  padding: 20px 15px;\n}\n"; });
define('text!design-item.html', ['module'], function(module) { module.exports = "<template bindable=\"id, name, href, liked\">\n  <h4 class=\"list-group-item-heading\">${id}: ${name}</h4>\n  <p class=\"list-group-item-text\">\n    <img src.bind=\"href\" />\n  </p>\n  <p>\n    <label>Like it <input type=\"checkbox\" checked.bind=\"liked\" /></label>\n  </p>\n</template>\n"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-3\"></div>\n      <div class=\"col-md-6\">\n        <div class=\"panel panel-default\">\n          <div class=\"panel-heading\">\n            <h3 class=\"panel-title\">Welcome</h3>\n          </div>\n          <div class=\"panel-body\" innerHTML.bind=\"message\"></div>\n        </div>\n        <div class=\"text-center\">\n          <a route-href=\"route: designs\" class=\"btn btn-primary\">Start</a>\n        </div>\n      </div>\n      <div class=\"col-md-3\"></div>\n    </div>\n  </div>\n</template>\n"; });
define('text!no-search.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"no-search text-center\">\n    <h2>${message}</h2>\n  </div>\n</template>\n"; });
define('text!search-list.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./design-item.html\"></require>\n\n  <div class=\"col-md-4 top10\">\n    <div class=\"search-list\">\n      <form submit.trigger=\"addSearch()\">\n        <div class=\"input-group\">\n          <input type=\"text\" value.bind=\"searchQuery\" placeholder=\"Enter a keyword\" class=\"form-control\" />\n          <span class=\"input-group-btn\">\n            <button type=\"submit\" class=\"btn btn-default\">Search</button>\n          </span>\n        </div>\n      </form>\n      <ul class=\"list-group top10\">\n        <li repeat.for=\"search of searches\" class=\"list-group-item\">\n          <span class=\"badge\">${search.designs.length}</span>\n          ${search.searchQuery}\n        </li>\n      </ul>\n    </div>\n    <a route-href=\"route: results\" class=\"btn btn-primary top10\">Finish</a>\n  </div>\n\n  <div class=\"design-list col-md-8 top10\">\n    <ul class=\"list-group\">\n      <li repeat.for=\"design of currentSearch.designs\" class=\"list-group-item\">\n        <div class=\"panel panel-default\">\n          <div class=\"panel-heading\">${design.name}</div>\n            <div class=\"panel-body text-center\">\n              <img src.bind=\"design.href\" class=\"img-thumbnail img-responsive\" />\n            </div>\n            <div class=\"panel-footer text-center\">\n              <label>Like it <input type=\"checkbox\" model.bind=\"design\" checked.bind=\"currentSearch.likedDesigns\" /></label>\n              <label>Dislike it <input type=\"checkbox\" model.bind=\"design\" checked.bind=\"currentSearch.dislikedDesigns\" /></label>\n            </div>\n          </div>\n        </div>\n      </li>\n    </ul>\n  </div>\n</template>\n"; });
define('text!stats.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"col-md-3\"></div>\n  <div class=\"col-md-6\">\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">Thank you!</div>\n      <div class=\"panel-body\">\n        <p>Total of voted designs: ${totalVotes}</p>\n      </div>\n\n      <table class=\"table table-striped top10\">\n        <tr>\n          <td></td>\n          <th>Liked</th>\n          <th>Disliked</th>\n        </tr>\n        <tr repeat.for=\"search of searches\">\n          <th>${search.searchQuery}</th>\n          <td>${search.likedDesigns.length}</td>\n          <td>${search.dislikedDesigns.length}</td>\n        </li>\n        </tr>\n      </table>\n    </div>\n\n    <div class=\"text-center\">\n      <a route-href=\"route: home\" class=\"btn btn-primary\">Start over</a>\n    </div>\n  </div>\n  <div class=\"col-md-3\"></div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map