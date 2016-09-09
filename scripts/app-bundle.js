define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
        }
        App.prototype.configureRouter = function (config, router) {
            config.title = 'LikeDesign';
            config.map([
                { route: '', moduleId: 'no-search', title: 'search' },
                { route: 'designs/:query', moduleId: 'design-list', name: 'designs' },
                { route: 'results', moduleId: 'results', title: 'results' }
            ]);
            this.router = router;
        };
        return App;
    }());
    exports.App = App;
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
define('design-list',["require", "exports", 'aurelia-framework', 'aurelia-fetch-client', './design'], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, design_1) {
    "use strict";
    var DesignList = (function () {
        function DesignList(http) {
            this.http = http;
            this.designs = [];
            this.selectedId = 0;
        }
        DesignList.prototype.activate = function (params, routeConfig) {
            this.routeConfig = routeConfig;
            this.fetchSearch(params.query, this.parseDesigns);
        };
        DesignList.prototype.fetchSearch = function (query, xmlParser) {
            var _this = this;
            this.http
                .configure(function (config) {
                config
                    .withBaseUrl('https://api.spreadshirt.net/api/v1/shops/205909/designs');
            })
                .fetch('?query=' + query + '&mediaType=json')
                .then(function (response) { return response.json(); })
                .then(function (data) {
                for (var _i = 0, _a = data.designs; _i < _a.length; _i++) {
                    var design = _a[_i];
                    _this.designs.push(new design_1.Design(design));
                }
            });
        };
        DesignList.prototype.select = function (design) {
            this.selectedId = design.id;
            return true;
        };
        DesignList = __decorate([
            aurelia_framework_1.autoinject, 
            __metadata('design:paramtypes', [aurelia_fetch_client_1.HttpClient])
        ], DesignList);
        return DesignList;
    }());
    exports.DesignList = DesignList;
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
define('design',["require", "exports", 'aurelia-framework'], function (require, exports, aurelia_framework_1) {
    "use strict";
    var Design = (function () {
        function Design(data) {
            this.liked = undefined;
            this.id = data.id;
            this.name = data.name;
            this.href = data.resources[0].href;
        }
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], Design.prototype, "liked", void 0);
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

define('search',["require", "exports"], function (require, exports) {
    "use strict";
    var Search = (function () {
        function Search(searchQuery) {
            this.designs = [];
            this.searchQuery = searchQuery;
        }
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
            this.router = router;
        }
        SearchList.prototype.addSearch = function () {
            var query = this.searchQuery;
            if (query) {
                this.searches.push(new search_1.Search(query));
                this.searchQuery = '';
                this.router.navigate('designs/' + query);
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

define('design-item',["require", "exports"], function (require, exports) {
    "use strict";
    ;
    var DesignItemCustomElement = (function () {
        function DesignItemCustomElement(name, href) {
        }
        return DesignItemCustomElement;
    }());
    exports.DesignItemCustomElement = DesignItemCustomElement;
});

define('design-item-custom-element',["require", "exports"], function (require, exports) {
    "use strict";
    var DesignItemCustomElement = (function () {
        function DesignItemCustomElement() {
            this.data = [];
        }
        DesignItemCustomElement.prototype.create = function () {
        };
        return DesignItemCustomElement;
    }());
    exports.DesignItemCustomElement = DesignItemCustomElement;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  <require from=\"./styles.css\"></require>\n  <require from=\"./search-list\"></require>\n\n  <nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" href=\"#\">\n        <i class=\"fa fa-user\"></i>\n        <span>LikeDesign</span>\n      </a>\n    </div>\n  </nav>\n\n  <div class=\"container\">\n    <div class=\"row\">\n      <search-list class=\"col-md-4\"></search-list>\n      <router-view class=\"col-md-8\"></router-view>\n    </div>\n  </div>\n</template>\n"; });
define('text!styles.css', ['module'], function(module) { module.exports = "body { padding-top: 70px; }\n\nsection {\n  margin: 0 20px;\n}\n\na:focus {\n  outline: none;\n}\n\n.navbar-nav li.loader {\n    margin: 12px 24px 0 6px;\n}\n\n.no-search {\n  margin: 20px;\n}\n\n.search-list {\n  overflow-y: auto;\n  border: 1px solid #ddd;\n  padding: 10px;\n}\n\n.panel {\n  margin: 20px;\n}\n\n.button-bar {\n  right: 0;\n  left: 0;\n  bottom: 0;\n  border-top: 1px solid #ddd;\n  background: white;\n}\n\n.button-bar > button {\n  float: right;\n  margin: 20px;\n}\n\nli.list-group-item {\n  list-style: none;\n}\n\nli.list-group-item > a {\n  text-decoration: none;\n}\n\nli.list-group-item.active > a {\n  color: white;\n}\n\n.top10 { margin-top:10px; }\n"; });
define('text!design-list.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./design-item.html\"></require>\n\n  <div class=\"design-list\">\n    <ul class=\"list-group\">\n      <li repeat.for=\"design of designs\" class=\"list-group-item\">\n        <design-item id=${design.id} name=${design.name} href=${design.href} href=${design.liked}></design-item>\n      </li>\n    </ul>\n  </div>\n</template>\n"; });
define('text!design.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"panel panel-primary\">\n    <div class=\"panel-heading\">\n      <h3 class=\"panel-title\">Search</h3>\n    </div>\n    <div class=\"panel-body\">\n      <form role=\"form\" class=\"form-horizontal\">\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-2 control-label\">Email</label>\n          <div class=\"col-sm-10\">\n            <input type=\"text\" placeholder=\"email\" class=\"form-control\" value.bind=\"search.email\">\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-sm-2 control-label\">Phone Number</label>\n          <div class=\"col-sm-10\">\n            <input type=\"text\" placeholder=\"phone number\" class=\"form-control\" value.bind=\"search.phoneNumber\">\n          </div>\n        </div>\n\n      </form>\n    </div>\n  </div>\n\n  <div class=\"button-bar\">\n    <button class=\"btn btn-success\" click.delegate=\"save()\" disabled.bind=\"!canSave\">Save</button>\n  </div>\n</template>\n"; });
define('text!no-search.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"no-search text-center\">\n    <h2>${message}</h2>\n  </div>\n</template>\n"; });
define('text!search-list.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"search-list\">\n      <form submit.trigger=\"addSearch()\">\n        <input type=\"text\" value.bind=\"searchQuery\">\n        <button type=\"submit\">Search</button>\n      </form>\n      <ul class=\"list-group top10\">\n        <li repeat.for=\"search of searches\" class=\"list-group-item\">\n          <h4 class=\"list-group-item-heading\">${search.searchQuery}</h4>\n          <p class=\"list-group-item-text\">${search.designs.length} designs</p>\n        </li>\n      </ul>\n    </div>\n</template>\n"; });
define('text!design-item.html', ['module'], function(module) { module.exports = "<template bindable=\"id, name, href\">\n  <h4 class=\"list-group-item-heading\">${id}: ${name}</h4>\n  <p class=\"list-group-item-text\">\n    <img src.bind=\"href\" />\n  </p>\n  <p>\n    Like it<input type=\"checkbox\" checked.bind=\"liked\" />\n  </p>\n</template>\n"; });
define('text!hello-world.html', ['module'], function(module) { module.exports = "\n<template bindable=\"firstName, lastName\">\n  Hello, ${firstName} ${lastName}!\n</template>\n\n  \n"; });
//# sourceMappingURL=app-bundle.js.map