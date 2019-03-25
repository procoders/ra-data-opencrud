"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var ra_data_graphql_1 = require("ra-data-graphql");
var react_admin_1 = require("react-admin");
var gqlTypes = __importStar(require("./utils/gqlTypes"));
var getFinalType_1 = __importDefault(require("./utils/getFinalType"));
var isList_1 = __importDefault(require("./utils/isList"));
var isRequired_1 = __importDefault(require("./utils/isRequired"));
exports.buildFields = function (introspectionResults) { return function (fields) {
    return fields.reduce(function (acc, field) {
        var type = getFinalType_1.default(field.type);
        if (type.name.startsWith('_')) {
            return acc;
        }
        if (type.kind !== graphql_1.TypeKind.OBJECT) {
            return acc.concat([gqlTypes.field(gqlTypes.name(field.name))]);
        }
        var linkedResource = introspectionResults.resources.find(function (r) { return r.type.name === type.name; });
        if (linkedResource) {
            return acc.concat([
                gqlTypes.field(gqlTypes.name(field.name), {
                    selectionSet: gqlTypes.selectionSet([
                        gqlTypes.field(gqlTypes.name('id'))
                    ])
                })
            ]);
        }
        var linkedType = introspectionResults.types.find(function (t) { return t.name === type.name; });
        if (linkedType) {
            return acc.concat([
                gqlTypes.field(gqlTypes.name(field.name), {
                    selectionSet: gqlTypes.selectionSet(exports.buildFields(introspectionResults)(linkedType.fields))
                })
            ]);
        }
        // NOTE: We might have to handle linked types which are not resources but will have to be careful about
        // ending with endless circular dependencies
        return acc;
    }, []);
}; };
exports.getArgType = function (arg) {
    var type = getFinalType_1.default(arg.type);
    var required = isRequired_1.default(arg.type);
    var list = isList_1.default(arg.type);
    if (list) {
        if (required) {
            return gqlTypes.listType(gqlTypes.nonNullType(gqlTypes.namedType(gqlTypes.name(type.name))));
        }
        return gqlTypes.listType(gqlTypes.namedType(gqlTypes.name(type.name)));
    }
    if (required) {
        return gqlTypes.nonNullType(gqlTypes.namedType(gqlTypes.name(type.name)));
    }
    return gqlTypes.namedType(gqlTypes.name(type.name));
};
exports.buildArgs = function (query, variables) {
    if (variables === void 0) { variables = {}; }
    if (query.args.length === 0) {
        return [];
    }
    var validVariables = Object.keys(variables).filter(function (k) { return typeof variables[k] !== 'undefined'; });
    return query.args
        .filter(function (arg) { return validVariables.includes(arg.name); })
        .reduce(function (acc, arg) { return acc.concat([
        gqlTypes.argument(gqlTypes.name(arg.name), gqlTypes.variable(gqlTypes.name(arg.name)))
    ]); }, []);
};
exports.buildApolloArgs = function (query, variables) {
    if (variables === void 0) { variables = {}; }
    if (query.args.length === 0) {
        return [];
    }
    var validVariables = Object.keys(variables).filter(function (k) { return typeof variables[k] !== 'undefined'; });
    return query.args
        .filter(function (arg) { return validVariables.includes(arg.name); })
        .reduce(function (acc, arg) { return acc.concat([
        gqlTypes.variableDefinition(gqlTypes.variable(gqlTypes.name(arg.name)), exports.getArgType(arg))
    ]); }, []);
};
//TODO: validate fragment against the schema
var buildFieldsFromFragment = function (fragment, resourceName, fetchType) {
    var parsedFragment = {};
    if (typeof fragment === 'object' &&
        fragment.kind &&
        fragment.kind === 'Document') {
        parsedFragment = fragment;
    }
    if (typeof fragment === 'string') {
        if (!fragment.startsWith('fragment')) {
            fragment = "fragment tmp on " + resourceName + " " + fragment;
        }
        try {
            parsedFragment = graphql_1.parse(fragment);
        }
        catch (e) {
            throw new Error("Invalid fragment given for resource '" + resourceName + "' and fetchType '" + fetchType + "' (" + e.message + ").");
        }
    }
    return parsedFragment.definitions[0].selectionSet.selections;
};
exports.default = (function (introspectionResults) { return function (resource, aorFetchType, queryType, variables, fragment) {
    var orderBy = variables.orderBy, skip = variables.skip, first = variables.first, countVariables = __rest(variables, ["orderBy", "skip", "first"]);
    var apolloArgs = exports.buildApolloArgs(queryType, variables);
    var args = exports.buildArgs(queryType, variables);
    var countArgs = exports.buildArgs(queryType, countVariables);
    var fields = !!fragment
        ? buildFieldsFromFragment(fragment, resource.type.name, aorFetchType)
        : exports.buildFields(introspectionResults)(resource.type.fields);
    if (aorFetchType === react_admin_1.GET_LIST ||
        aorFetchType === react_admin_1.GET_MANY ||
        aorFetchType === react_admin_1.GET_MANY_REFERENCE) {
        return gqlTypes.document([
            gqlTypes.operationDefinition('query', gqlTypes.selectionSet([
                gqlTypes.field(gqlTypes.name(queryType.name), {
                    alias: gqlTypes.name('items'),
                    arguments: args,
                    selectionSet: gqlTypes.selectionSet(fields)
                }),
                gqlTypes.field(gqlTypes.name(queryType.name + "Connection"), {
                    alias: gqlTypes.name('total'),
                    arguments: countArgs,
                    selectionSet: gqlTypes.selectionSet([
                        gqlTypes.field(gqlTypes.name('aggregate'), {
                            selectionSet: gqlTypes.selectionSet([
                                gqlTypes.field(gqlTypes.name('count'))
                            ])
                        })
                    ])
                })
            ]), gqlTypes.name(queryType.name), apolloArgs)
        ]);
    }
    if (aorFetchType === react_admin_1.DELETE) {
        return gqlTypes.document([
            gqlTypes.operationDefinition('mutation', gqlTypes.selectionSet([
                gqlTypes.field(gqlTypes.name(queryType.name), {
                    alias: gqlTypes.name('data'),
                    arguments: args,
                    selectionSet: gqlTypes.selectionSet([
                        gqlTypes.field(gqlTypes.name('id'))
                    ])
                })
            ]), gqlTypes.name(queryType.name), apolloArgs)
        ]);
    }
    return gqlTypes.document([
        gqlTypes.operationDefinition(ra_data_graphql_1.QUERY_TYPES.includes(aorFetchType) ? 'query' : 'mutation', gqlTypes.selectionSet([
            gqlTypes.field(gqlTypes.name(queryType.name), {
                alias: gqlTypes.name('data'),
                arguments: args,
                selectionSet: gqlTypes.selectionSet(fields)
            })
        ]), gqlTypes.name(queryType.name), apolloArgs)
    ]);
}; });
//# sourceMappingURL=buildGqlQuery.js.map