import { IntrospectionResult } from './constants/interfaces';
import { DocumentNode } from 'graphql';
export declare const buildQueryFactory: () => (introspectionResults: IntrospectionResult) => (aorFetchType: string, resourceName: string, params: any, fragment: DocumentNode) => {
    query: DocumentNode;
    variables: {
        [key: string]: any;
    };
    parseResponse: (response: {
        [key: string]: any;
    }) => {
        data: any;
        total: any;
    } | {
        data: any;
        total?: undefined;
    };
};
declare const _default: (introspectionResults: IntrospectionResult) => (aorFetchType: string, resourceName: string, params: any, fragment: DocumentNode) => {
    query: DocumentNode;
    variables: {
        [key: string]: any;
    };
    parseResponse: (response: {
        [key: string]: any;
    }) => {
        data: any;
        total: any;
    } | {
        data: any;
        total?: undefined;
    };
};
export default _default;
//# sourceMappingURL=buildQuery.d.ts.map