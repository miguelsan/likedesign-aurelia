define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
        }
        App.prototype.configureRouter = function (config, router) {
            config.title = 'LikeDesign';
            config.map([
                { route: '', moduleId: 'no-search', title: 'search' },
                { route: 'searchs/:id', moduleId: 'search', name: 'searchs' },
                { route: 'results', moduleId: 'results', title: 'results' }
            ]);
            this.router = router;
        };
        return App;
    }());
    exports.App = App;
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

define('web-api',["require", "exports"], function (require, exports) {
    "use strict";
    var latency = 200;
    var id = 0;
    function getId() {
        return ++id;
    }
    var searchs = [
        {
            id: getId(),
            email: 'tolkien@inklings.com',
            phoneNumber: '10115496'
        },
        {
            id: getId(),
            email: 'lewis@inklings.com',
            phoneNumber: '1'
        },
        {
            id: getId(),
            email: 'barfield@inklings.com',
            phoneNumber: '2'
        },
        {
            id: getId(),
            email: 'williams@inklings.com',
            phoneNumber: '12075'
        },
        {
            id: getId(),
            email: 'green@inklings.com',
            phoneNumber: '8675309'
        }
    ];
    var WebAPI = (function () {
        function WebAPI() {
            this.isRequesting = false;
        }
        WebAPI.prototype.getSearchList = function () {
            var _this = this;
            this.isRequesting = true;
            return new Promise(function (resolve) {
                setTimeout(function () {
                    var results = searchs.map(function (x) {
                        return {
                            id: x.id,
                            firstName: x.firstName,
                            lastName: x.lastName,
                            email: x.email
                        };
                    });
                    resolve(results);
                    _this.isRequesting = false;
                }, latency);
            });
        };
        WebAPI.prototype.getSearchs = function (id) {
            var _this = this;
            this.isRequesting = true;
            return new Promise(function (resolve) {
                setTimeout(function () {
                    var found = searchs.filter(function (x) { return x.id == id; })[0];
                    resolve(JSON.parse(JSON.stringify(found)));
                    _this.isRequesting = false;
                }, latency);
            });
        };
        WebAPI.prototype.saveSearch = function (search) {
            var _this = this;
            this.isRequesting = true;
            return new Promise(function (resolve) {
                setTimeout(function () {
                    var instance = JSON.parse(JSON.stringify(search));
                    var found = searchs.filter(function (x) { return x.id == search.id; })[0];
                    if (found) {
                        var index = searchs.indexOf(found);
                        searchs[index] = instance;
                    }
                    else {
                        instance.id = getId();
                        searchs.push(instance);
                    }
                    _this.isRequesting = false;
                    resolve(instance);
                }, latency);
            });
        };
        return WebAPI;
    }());
    exports.WebAPI = WebAPI;
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
define('search-list',["require", "exports", 'aurelia-event-aggregator', './web-api', './messages', 'aurelia-framework'], function (require, exports, aurelia_event_aggregator_1, web_api_1, messages_1, aurelia_framework_1) {
    "use strict";
    var SearchList = (function () {
        function SearchList(api, ea) {
            var _this = this;
            this.api = api;
            this.selectedId = 0;
            ea.subscribe(messages_1.SearchViewed, function (msg) { return _this.select(msg.search); });
            ea.subscribe(messages_1.SearchUpdated, function (msg) {
                var id = msg.search.id;
                var found = _this.searchs.find(function (x) { return x.id == id; });
                Object.assign(found, msg.search);
            });
        }
        SearchList.prototype.created = function () {
            var _this = this;
            this.api.getSearchList().then(function (searchs) { return _this.searchs = searchs; });
        };
        SearchList.prototype.select = function (search) {
            this.selectedId = search.id;
            return true;
        };
        SearchList = __decorate([
            aurelia_framework_1.inject(web_api_1.WebAPI, aurelia_event_aggregator_1.EventAggregator), 
            __metadata('design:paramtypes', [web_api_1.WebAPI, aurelia_event_aggregator_1.EventAggregator])
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

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('search',["require", "exports", 'aurelia-framework', 'aurelia-event-aggregator', './web-api', './messages', './utility'], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, web_api_1, messages_1, utility_1) {
    "use strict";
    var Search = (function () {
        function Search(api, ea) {
            this.api = api;
            this.ea = ea;
        }
        Search.prototype.activate = function (params, routeConfig) {
            var _this = this;
            this.routeConfig = routeConfig;
            return this.api.getSearchs(params.id).then(function (search) {
                _this.search = search;
                _this.routeConfig.navModel.setTitle(_this.search.firstName);
                _this.originalSearch = JSON.parse(JSON.stringify(_this.search));
                _this.ea.publish(new messages_1.SearchViewed(_this.search));
            });
        };
        Object.defineProperty(Search.prototype, "canSave", {
            get: function () {
                return this.search.firstName && this.search.lastName && !this.api.isRequesting;
            },
            enumerable: true,
            configurable: true
        });
        Search.prototype.save = function () {
            var _this = this;
            this.api.saveSearch(this.search).then(function (search) {
                _this.search = search;
                _this.routeConfig.navModel.setTitle(_this.search.firstName);
                _this.originalSearch = JSON.parse(JSON.stringify(search));
                _this.ea.publish(new messages_1.SearchUpdated(_this.search));
            });
        };
        Search.prototype.canDeactivate = function () {
            if (!utility_1.areEqual(this.originalSearch, this.search)) {
                var result = confirm('You have unsaved changes. Are you sure you wish to leave?');
                if (!result) {
                    this.ea.publish(new messages_1.SearchViewed(this.search));
                }
                return result;
            }
            return true;
        };
        Search = __decorate([
            aurelia_framework_1.inject(web_api_1.WebAPI, aurelia_event_aggregator_1.EventAggregator), 
            __metadata('design:paramtypes', [web_api_1.WebAPI, aurelia_event_aggregator_1.EventAggregator])
        ], Search);
        return Search;
    }());
    exports.Search = Search;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"./styles.css\"></require>\n  <require from=\"./search-list\"></require>\n\n  <nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" href=\"#\">\n        <i class=\"fa fa-user\"></i>\n        <span>LikeDesign</span>\n      </a>\n    </div>\n  </nav>\n\n  <div class=\"container\">\n    <div class=\"row\">\n      <search-list class=\"col-md-4\"></search-list>\n      <router-view class=\"col-md-8\"></router-view>\n    </div>\n  </div>\n</template>\n"; });
define('text!styles.css', ['module'], function(module) { module.exports = "body { padding-top: 70px; }\n\nsection {\n  margin: 0 20px;\n}\n\na:focus {\n  outline: none;\n}\n\n.navbar-nav li.loader {\n    margin: 12px 24px 0 6px;\n}\n\n.no-search {\n  margin: 20px;\n}\n\n.search-list {\n  overflow-y: auto;\n  border: 1px solid #ddd;\n  padding: 10px;\n}\n\n.panel {\n  margin: 20px;\n}\n\n.button-bar {\n  right: 0;\n  left: 0;\n  bottom: 0;\n  border-top: 1px solid #ddd;\n  background: white;\n}\n\n.button-bar > button {\n  float: right;\n  margin: 20px;\n}\n\nli.list-group-item {\n  list-style: none;\n}\n\nli.list-group-item > a {\n  text-decoration: none;\n}\n\nli.list-group-item.active > a {\n  color: white;\n}\n"; });
define('text!no-search.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"no-search text-center\">\n    <h2>${message}</h2>\n  </div>\n</template>\n"; });
define('text!search-list.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"search-list\">\n    <ul class=\"list-group\">\n      <li repeat.for=\"search of searchs\" class=\"list-group-item ${search.id === $parent.selectedId ? 'active' : ''}\">\n        <a route-href=\"route: searchs; params.bind: {id:search.id}\" click.delegate=\"$parent.select(search)\">\n          <h4 class=\"list-group-item-heading\">${search.id}</h4>\n          <p class=\"list-group-item-text\">${search.email}</p>\n        </a>\n      </li>\n    </ul>\n  </div>\n</template>\n"; });
define('text!search.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"panel panel-primary\">\n    <div class=\"panel-heading\">\n      <h3 class=\"panel-title\">Search</h3>\n    </div>\n    <div class=\"panel-body\">\n      <form role=\"form\" class=\"form-horizontal\">\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-2 control-label\">Email</label>\n          <div class=\"col-sm-10\">\n            <input type=\"text\" placeholder=\"email\" class=\"form-control\" value.bind=\"search.email\">\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-2 control-label\">Phone Number</label>\n          <div class=\"col-sm-10\">\n            <input type=\"text\" placeholder=\"phone number\" class=\"form-control\" value.bind=\"search.phoneNumber\">\n          </div>\n        </div>\n\n      </form>\n    </div>\n  </div>\n\n  <div class=\"button-bar\">\n    <button class=\"btn btn-success\" click.delegate=\"save()\" disabled.bind=\"!canSave\">Save</button>\n  </div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map