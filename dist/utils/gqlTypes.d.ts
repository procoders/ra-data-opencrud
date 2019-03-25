import { DefinitionNode, DocumentNode, OperationDefinitionNode, OperationTypeNode, NameNode, VariableDefinitionNode, SelectionSetNode, SelectionNode, FieldNode, ListTypeNode, TypeNode, NonNullTypeNode, NamedTypeNode, VariableNode, ValueNode, ArgumentNode } from 'graphql';
export declare const document: (definitions: DefinitionNode[]) => DocumentNode;
export declare const operationDefinition: (operation: OperationTypeNode, selectionSet: SelectionSetNode, name: NameNode, variableDefinitions: VariableDefinitionNode[]) => OperationDefinitionNode;
export declare const selectionSet: (selections: SelectionNode[]) => SelectionSetNode;
export declare const field: (name: NameNode, optionalValues?: Partial<FieldNode>) => FieldNode;
export declare const listType: (type: TypeNode) => ListTypeNode;
export declare const nonNullType: (type: NamedTypeNode | ListTypeNode) => NonNullTypeNode;
export declare const variableDefinition: (variable: VariableNode, type: TypeNode) => VariableDefinitionNode;
export declare const variable: (name: NameNode) => VariableNode;
export declare const name: (value: string) => NameNode;
export declare const namedType: (name: NameNode) => NamedTypeNode;
export declare const argument: (name: NameNode, value: ValueNode) => ArgumentNode;
//# sourceMappingURL=gqlTypes.d.ts.map