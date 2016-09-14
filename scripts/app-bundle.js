define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
        }
        App.prototype.configureRouter = function (config, router) {
            config.title = 'LikeDesign';
            config.map([
                { route: '', moduleId: 'no-search', title: 'Home' },
                { route: 'results', moduleId: 'results', name: 'results', title: 'Finish' },
                { route: 'designs/:query', moduleId: 'search-list', name: 'designs', title: 'Search' },
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

define('messages',["require", "exports"], function (require, exports) {
    "use strict";
    var SearchUpdated = (function () {
        function SearchUpdated(search) {
            this.search = search;
        }
        return SearchUpdated;
    }());
    exports.SearchUpdated = SearchUpdated;
    var SearchViewed = (function () {
        function SearchViewed(search) {
            this.search = search;
        }
        return SearchViewed;
    }());
    exports.SearchViewed = SearchViewed;
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

define('results',["require", "exports"], function (require, exports) {
    "use strict";
    var Results = (function () {
        function Results() {
            this.message = "Please enter a search query.";
        }
        return Results;
    }());
    exports.Results = Results;
});

define('search',["require", "exports", 'aurelia-fetch-client', './design'], function (require, exports, aurelia_fetch_client_1, design_1) {
    "use strict";
    var Search = (function () {
        function Search(searchQuery) {
            this.designs = [];
            this.likedDesigns = [];
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

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('search-list',["require", "exports", 'aurelia-framework', './search', 'aurelia-router'], function (require, exports, aurelia_framework_1, search_1, aurelia_router_1) {
    "use strict";
    var SearchList = (function () {
        function SearchList(router) {
            this.heading = "Searches";
            this.searchQuery = '';
            this.searches = [];
            this.currentSearch = undefined;
            this.router = router;
        }
        SearchList.prototype.addSearch = function () {
            var currentQuery = this.searchQuery;
            if (currentQuery) {
                this.currentSearch = new search_1.Search(currentQuery);
                this.searches.push(this.currentSearch);
                this.searchQuery = '';
                this.router.navigate('designs/' + currentQuery);
            }
        };
        SearchList = __decorate([
            aurelia_framework_1.inject(aurelia_router_1.Router), 
            __metadata('design:paramtypes', [Object])
        ], SearchList);
        return SearchList;
    }());
    exports.SearchList = SearchList;
});

define('utility',["require", "exports"], function (require, exports) {
    "use strict";
    function areEqual(obj1, obj2) {
        return Object.keys(obj1).every(function (key) { return obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]); });
    }
    exports.areEqual = areEqual;
    ;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"./styles.css\"></require>\n\n  <nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" href=\"#\">\n        <i class=\"fa fa-user\"></i>\n        <span>LikeDesign</span>\n      </a>\n    </div>\n  </nav>\n\n  <div class=\"container\">\n    <div class=\"row\">\n      <router-view></router-view>\n    </div>\n  </div>\n</template>\n"; });
define('text!styles.css', ['module'], function(module) { module.exports = "body { padding-top: 70px; }\n\nsection {\n  margin: 0 20px;\n}\n\na:focus {\n  outline: none;\n}\n\n.navbar-nav li.loader {\n    margin: 12px 24px 0 6px;\n}\n\n.no-search {\n  margin: 20px;\n}\n\n.search-list {\n  overflow-y: auto;\n  border: 1px solid #ddd;\n  padding: 10px;\n}\n\n.panel {\n  margin: 20px;\n}\n\n.button-bar {\n  right: 0;\n  left: 0;\n  bottom: 0;\n  border-top: 1px solid #ddd;\n  background: white;\n}\n\n.button-bar > button {\n  float: right;\n  margin: 20px;\n}\n\nli.list-group-item {\n  list-style: none;\n}\n\nli.list-group-item > a {\n  text-decoration: none;\n}\n\nli.list-group-item.active > a {\n  color: white;\n}\n\n.top10 { margin-top:10px; }\n"; });
define('text!design-item.html', ['module'], function(module) { module.exports = "<template bindable=\"id, name, href, liked\">\n  <h4 class=\"list-group-item-heading\">${id}: ${name}</h4>\n  <p class=\"list-group-item-text\">\n    <img src.bind=\"href\" />\n  </p>\n  <p>\n    <label>Like it <input type=\"checkbox\" checked.bind=\"liked\" /></label>\n  </p>\n</template>\n"; });
define('text!no-search.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"no-search text-center\">\n    <h2>${message}</h2>\n  </div>\n</template>\n"; });
define('text!results.html', ['module'], function(module) { module.exports = "<template>\n  <p>\n    Results\n  </p>\n</template>\n"; });
define('text!search-list.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./design-item.html\"></require>\n\n  <div class=\"col-md-4\">\n    <div class=\"search-list\">\n      <form submit.trigger=\"addSearch()\">\n        <input type=\"text\" value.bind=\"searchQuery\">\n        <button type=\"submit\">Search</button>\n      </form>\n      <ul class=\"list-group top10\">\n        <li repeat.for=\"search of searches\" class=\"list-group-item\">\n          <h4 class=\"list-group-item-heading\">${search.searchQuery}</h4>\n          <p class=\"list-group-item-text\">${search.designs.length} designs</p>\n          <p class=\"list-group-item-text\">${search.likedDesigns.length} liked</p>\n        </li>\n      </ul>\n    </div>\n    <a route-href=\"route: results\">Finish</a>\n  </div>\n\n  <div class=\"design-list col-md-8\">\n    <ul class=\"list-group\">\n      <li repeat.for=\"design of currentSearch.designs\" class=\"list-group-item\">\n        <h4 class=\"list-group-item-heading\">${design.id}: ${design.name}</h4>\n        <p class=\"list-group-item-text\">\n          <img src.bind=\"design.href\" />\n          <label>Like it <input type=\"checkbox\" model.bind=\"design\" checked.bind=\"currentSearch.likedDesigns\" /></label>\n        </p>\n      </li>\n    </ul>\n  </div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map