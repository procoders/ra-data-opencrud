import { IntrospectionTypeRef, IntrospectionNamedTypeRef } from 'graphql';
/**
 * Ensure we get the real type even if the root type is NON_NULL or LIST
 * @param {GraphQLType} type
 */
declare const getFinalType: (type: IntrospectionTypeRef) => IntrospectionNamedTypeRef<import("graphql").IntrospectionType>;
export default getFinalType;
//# sourceMappingURL=getFinalType.d.ts.map