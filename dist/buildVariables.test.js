"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_admin_1 = require("react-admin");
var buildVariables_1 = __importDefault(require("./buildVariables"));
var introspection_1 = require("graphql/type/introspection");
describe('buildVariables', function () {
    describe('GET_LIST', function () {
        it('returns correct variables', function () {
            var introspectionResult = {
                types: [
                    {
                        kind: 'INPUT_OBJECT',
                        name: 'PostWhereInput',
                        inputFields: [{ name: 'tags_some', type: { kind: '', name: '' } }]
                    }
                ]
            };
            var params = {
                filter: {
                    ids: ['foo1', 'foo2'],
                    tags: { id: ['tag1', 'tag2'] },
                    'author.id': 'author1',
                    views: 100
                },
                pagination: { page: 10, perPage: 10 },
                sort: { field: 'sortField', order: 'DESC' }
            };
            expect(buildVariables_1.default(introspectionResult)({ type: { name: 'Post' } }, react_admin_1.GET_LIST, params)).toEqual({
                where: {
                    id_in: ['foo1', 'foo2'],
                    tags_some: { id_in: ['tag1', 'tag2'] },
                    author: { id: 'author1' },
                    views: 100
                },
                first: 10,
                orderBy: 'sortField_DESC',
                skip: 90
            });
        });
    });
    describe('CREATE', function () {
        it('returns correct variables', function () {
            var introspectionResult = {
                types: [
                    {
                        name: 'Post',
                        fields: [
                            {
                                name: 'title'
                            }
                        ]
                    },
                    {
                        name: 'PostCreateInput',
                        kind: introspection_1.TypeKind.INPUT_OBJECT,
                        inputFields: [
                            {
                                name: 'author',
                                type: {
                                    kind: introspection_1.TypeKind.NON_NULL,
                                    ofType: {
                                        kind: introspection_1.TypeKind.INPUT_OBJECT,
                                        name: 'AuthorCreateOneInput'
                                    }
                                }
                            },
                            {
                                name: 'tags',
                                type: {
                                    kind: introspection_1.TypeKind.NON_NULL,
                                    ofType: {
                                        kind: introspection_1.TypeKind.INPUT_OBJECT,
                                        name: 'TagCreateManyInput'
                                    }
                                }
                            }
                        ]
                    },
                    {
                        name: 'AuthorCreateOneInput',
                        kind: introspection_1.TypeKind.INPUT_OBJECT,
                        inputFields: [
                            {
                                name: 'connect',
                                type: {
                                    kind: introspection_1.TypeKind.NON_NULL,
                                    ofType: {
                                        kind: introspection_1.TypeKind.INPUT_OBJECT,
                                        name: 'AuthorWhereUniqueInput'
                                    }
                                }
                            }
                        ]
                    },
                    {
                        name: 'AuthorWhereUniqueInput',
                        kind: introspection_1.TypeKind.INPUT_OBJECT,
                        inputFields: [
                            {
                                name: 'id',
                                type: {
                                    kind: introspection_1.TypeKind.SCALAR,
                                    name: 'String'
                                }
                            }
                        ]
                    },
                    {
                        name: 'TagCreateManyInput',
                        kind: introspection_1.TypeKind.INPUT_OBJECT,
                        inputFields: [
                            {
                                name: 'connect',
                                type: {
                                    kind: introspection_1.TypeKind.NON_NULL,
                                    ofType: {
                                        kind: introspection_1.TypeKind.INPUT_OBJECT,
                                        name: 'TagWhereUniqueInput'
                                    }
                                }
                            }
                        ]
                    },
                    {
                        name: 'TagWhereUniqueInput',
                        kind: introspection_1.TypeKind.INPUT_OBJECT,
                        inputFields: [
                            {
                                name: 'id',
                                type: {
                                    kind: introspection_1.TypeKind.SCALAR,
                                    name: 'String'
                                }
                            }
                        ]
                    }
                ]
            };
            var params = {
                data: {
                    author: { id: 'author1' },
                    title: 'Foo',
                    tags: [{ id: 'tags1' }, { id: 'tags2' }],
                    tagsIds: ['tags1', 'tags2']
                }
            };
            expect(buildVariables_1.default(introspectionResult)({ type: { name: 'Post' } }, react_admin_1.CREATE, params)).toEqual({
                data: {
                    author: { connect: { id: 'author1' } },
                    tags: {
                        connect: [{ id: 'tags1' }, { id: 'tags2' }]
                    },
                    title: 'Foo'
                }
            });
        });
    });
    describe('UPDATE', function () {
        it('returns correct variables', function () {
            var introspectionResult = {
                types: [
                    {
                        name: 'Post',
                        fields: [{ name: 'title' }]
                    },
                    {
                        name: 'PostUpdateInput',
                        kind: introspection_1.TypeKind.INPUT_OBJECT,
                        inputFields: [
                            {
                                name: 'author',
                                type: {
                                    kind: introspection_1.TypeKind.NON_NULL,
                                    ofType: {
                                        kind: introspection_1.TypeKind.INPUT_OBJECT,
                                        name: 'AuthorUpdateOneInput'
                                    }
                                }
                            },
                            {
                                name: 'tags',
                                type: {
                                    kind: introspection_1.TypeKind.NON_NULL,
                                    ofType: {
                                        kind: introspection_1.TypeKind.INPUT_OBJECT,
                                        name: 'TagsUpdateManyInput'
                                    }
                                }
                            }
                        ]
                    },
                    {
                        name: 'AuthorUpdateOneInput',
                        kind: introspection_1.TypeKind.INPUT_OBJECT,
                        inputFields: [
                            {
                                name: 'connect',
                                type: {
                                    kind: introspection_1.TypeKind.NON_NULL,
                                    ofType: {
                                        kind: introspection_1.TypeKind.INPUT_OBJECT,
                                        name: 'AuthorWhereUniqueInput'
                                    }
                                }
                            }
                        ]
                    },
                    {
                        name: 'TagsUpdateManyInput',
                        kind: introspection_1.TypeKind.INPUT_OBJECT,
                        inputFields: [
                            {
                                name: 'connect',
                                type: {
                                    kind: introspection_1.TypeKind.NON_NULL,
                                    ofType: {
                                        kind: introspection_1.TypeKind.INPUT_OBJECT,
                                        name: 'TagsWhereUniqueInput'
                                    }
                                }
                            }
                        ]
                    },
                    {
                        name: 'TagsWhereUniqueInput',
                        kind: introspection_1.TypeKind.INPUT_OBJECT,
                        inputFields: [
                            {
                                name: 'id',
                                type: {
                                    kind: introspection_1.TypeKind.SCALAR,
                                    name: 'String'
                                }
                            }
                        ]
                    },
                    {
                        name: 'AuthorWhereUniqueInput',
                        kind: introspection_1.TypeKind.INPUT_OBJECT,
                        inputFields: [
                            {
                                name: 'id',
                                type: {
                                    kind: introspection_1.TypeKind.SCALAR,
                                    name: 'String'
                                }
                            }
                        ]
                    }
                ]
            };
            var params = {
                data: {
                    id: 'postId',
                    tags: [{ id: 'tags1' }, { id: 'tags2' }],
                    tagsIds: ['tags1', 'tags2'],
                    author: { id: 'author1' },
                    title: 'Foo'
                },
                previousData: {
                    tags: [{ id: 'tags1' }],
                    tagsIds: ['tags1']
                }
            };
            expect(buildVariables_1.default(introspectionResult)({ type: { name: 'Post' } }, react_admin_1.UPDATE, params)).toEqual({
                where: { id: 'postId' },
                data: {
                    author: { connect: { id: 'author1' } },
                    tags: {
                        connect: [{ id: 'tags2' }],
                        disconnect: []
                    },
                    title: 'Foo'
                }
            });
        });
    });
    describe('GET_MANY', function () {
        it('returns correct variables', function () {
            var params = {
                ids: ['tag1', 'tag2']
            };
            expect(buildVariables_1.default({})({ type: { name: 'Post' } }, react_admin_1.GET_MANY, params)).toEqual({
                where: { id_in: ['tag1', 'tag2'] }
            });
        });
    });
    describe('GET_MANY_REFERENCE', function () {
        it('returns correct variables', function () {
            var params = {
                target: 'author.id',
                id: 'author1'
            };
            expect(buildVariables_1.default({})({ type: { name: 'Post' } }, react_admin_1.GET_MANY_REFERENCE, params)).toEqual({
                where: { author: { id: 'author1' } }
            });
        });
    });
    describe('DELETE', function () {
        it('returns correct variables', function () {
            var params = {
                id: 'post1'
            };
            expect(buildVariables_1.default({})({ type: { name: 'Post', inputFields: [] } }, react_admin_1.DELETE, params)).toEqual({
                where: { id: 'post1' }
            });
        });
    });
});
//# sourceMappingURL=buildVariables.test.js.map