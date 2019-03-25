import { ApolloClient, ApolloClientOptions } from 'apollo-client';
export declare const buildQuery: (introspectionResults: import("./constants/interfaces").IntrospectionResult) => (aorFetchType: string, resourceName: string, params: any, fragment: import("graphql/language/ast").DocumentNode) => {
    query: import("graphql/language/ast").DocumentNode;
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
declare const _default: (options: {
    client?: ApolloClient<any> | undefined;
    clientOptions?: ApolloClientOptions<any> | undefined;
}) => Promise<(fetchType: string, resource: string, params: {
    [key: string]: any;
}) => Promise<any>>;
export default _default;
//# sourceMappingURL=index.d.ts.map