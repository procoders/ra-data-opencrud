"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var camelCase_1 = __importDefault(require("lodash/camelCase"));
var merge_1 = __importDefault(require("lodash/merge"));
var pluralize_1 = __importDefault(require("pluralize"));
var ra_data_graphql_1 = __importDefault(require("ra-data-graphql"));
var react_admin_1 = require("react-admin");
var buildQuery_1 = __importDefault(require("./buildQuery"));
exports.buildQuery = buildQuery_1.default;
var defaultOptions = {
    buildQuery: exports.buildQuery,
    introspection: {
        operationNames: (_a = {},
            _a[react_admin_1.GET_LIST] = function (resource) {
                return "" + pluralize_1.default(camelCase_1.default(resource.name));
            },
            _a[react_admin_1.GET_ONE] = function (resource) { return "" + camelCase_1.default(resource.name); },
            _a[react_admin_1.GET_MANY] = function (resource) {
                return "" + pluralize_1.default(camelCase_1.default(resource.name));
            },
            _a[react_admin_1.GET_MANY_REFERENCE] = function (resource) {
                return "" + pluralize_1.default(camelCase_1.default(resource.name));
            },
            _a[react_admin_1.CREATE] = function (resource) { return "create" + resource.name; },
            _a[react_admin_1.UPDATE] = function (resource) { return "update" + resource.name; },
            _a[react_admin_1.DELETE] = function (resource) { return "delete" + resource.name; },
            _a),
        exclude: undefined,
        include: undefined
    }
};
//TODO: Prisma supports batching (UPDATE_MANY, DELETE_MANY)
exports.default = (function (options) {
    return ra_data_graphql_1.default(merge_1.default({}, defaultOptions, options)).then(function (graphQLDataProvider) {
        return function (fetchType, resource, params) {
            // Temporary work-around until we make use of updateMany and deleteMany mutations
            if (fetchType === react_admin_1.DELETE_MANY) {
                var ids = params.ids, otherParams_1 = __rest(params, ["ids"]);
                return Promise.all(params.ids.map(function (id) {
                    return graphQLDataProvider(react_admin_1.DELETE, resource, __assign({ id: id }, otherParams_1));
                })).then(function (results) {
                    return { data: results.map(function (_a) {
                            var data = _a.data;
                            return data.id;
                        }) };
                });
            }
            if (fetchType === react_admin_1.UPDATE_MANY) {
                var ids = params.ids, otherParams_2 = __rest(params, ["ids"]);
                return Promise.all(params.ids.map(function (id) {
                    return graphQLDataProvider(react_admin_1.UPDATE, resource, __assign({ id: id }, otherParams_2));
                })).then(function (results) {
                    return { data: results.map(function (_a) {
                            var data = _a.data;
                            return data.id;
                        }) };
                });
            }
            return graphQLDataProvider(fetchType, resource, params);
        };
    });
});
//# sourceMappingURL=index.js.map