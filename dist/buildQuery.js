"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var buildVariables_1 = __importDefault(require("./buildVariables"));
var buildGqlQuery_1 = __importDefault(require("./buildGqlQuery"));
var getResponseParser_1 = __importDefault(require("./getResponseParser"));
exports.buildQueryFactory = function () { return function (introspectionResults) {
    var knownResources = introspectionResults.resources.map(function (r) { return r.type.name; });
    return function (aorFetchType, resourceName, params, fragment) {
        var resource = introspectionResults.resources.find(function (r) { return r.type.name === resourceName; });
        if (!resource) {
            throw new Error("Unknown resource " + resourceName + ". Make sure it has been declared on your server side schema. Known resources are " + knownResources.join(', '));
        }
        var queryType = resource[aorFetchType];
        if (!queryType) {
            throw new Error("No query or mutation matching aor fetch type " + aorFetchType + " could be found for resource " + resource.type.name);
        }
        var variables = buildVariables_1.default(introspectionResults)(resource, aorFetchType, params);
        var query = buildGqlQuery_1.default(introspectionResults)(resource, aorFetchType, queryType, variables, fragment);
        var parseResponse = getResponseParser_1.default(introspectionResults)(aorFetchType, resource);
        return {
            query: query,
            variables: variables,
            parseResponse: parseResponse
        };
    };
}; };
exports.default = exports.buildQueryFactory();
//# sourceMappingURL=buildQuery.js.map