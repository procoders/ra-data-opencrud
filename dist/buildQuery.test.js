"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buildQuery_1 = require("./buildQuery");
describe('buildQuery', function () {
    var queryType = 'query_type';
    var resource = {
        type: { name: 'Post' },
        GET_LIST: queryType
    };
    var introspectionResults = {
        resources: [resource]
    };
    it('throws an error if resource is unknown', function () {
        expect(function () {
            return buildQuery_1.buildQueryFactory()(introspectionResults)('GET_LIST', 'Comment', {}, {});
        }).toThrow('Unknown resource Comment. Make sure it has been declared on your server side schema. Known resources are Post');
    });
    it('throws an error if resource does not have a query or mutation for specified AOR fetch type', function () {
        expect(function () {
            return buildQuery_1.buildQueryFactory()(introspectionResults)('CREATE', 'Post', {}, {});
        }).toThrow('No query or mutation matching aor fetch type CREATE could be found for resource Post');
    });
});
//# sourceMappingURL=buildQuery.test.js.map