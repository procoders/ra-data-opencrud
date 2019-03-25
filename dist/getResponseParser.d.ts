import { IntrospectionResult, Resource } from './constants/interfaces';
declare const _default: (introspectionResults: IntrospectionResult) => (aorFetchType: string, resource: Resource) => (response: {
    [key: string]: any;
}) => {
    data: any;
    total: any;
} | {
    data: any;
    total?: undefined;
};
export default _default;
//# sourceMappingURL=getResponseParser.d.ts.map