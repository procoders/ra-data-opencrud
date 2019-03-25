import { IntrospectionField, DocumentNode, VariableDefinitionNode, ArgumentNode, FieldNode } from 'graphql';
import { IntrospectionResult, Resource } from './constants/interfaces';
export interface Query {
    name?: string;
    args: IntrospectionField[];
}
export declare const buildFields: (introspectionResults: IntrospectionResult) => (fields: IntrospectionField[]) => FieldNode[];
export declare const getArgType: (arg: IntrospectionField) => import("graphql/language/ast").TypeNode;
export declare const buildArgs: (query: Query, variables?: {
    [key: string]: any;
}) => ArgumentNode[];
export declare const buildApolloArgs: (query: Query, variables?: {
    [key: string]: any;
}) => VariableDefinitionNode[];
declare const _default: (introspectionResults: IntrospectionResult) => (resource: Resource, aorFetchType: string, queryType: Query, variables: {
    [key: string]: any;
}, fragment: DocumentNode) => DocumentNode;
export default _default;
//# sourceMappingURL=buildGqlQuery.d.ts.map