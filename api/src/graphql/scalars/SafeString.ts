import { ASTNode, GraphQLError, GraphQLScalarType, Kind } from 'graphql'

// Validates strings are non empty and are less than 191 characters.
// 191 is the smallest safe max length for a string in Prisma
// https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#string
// Based off https://github.com/Urigo/graphql-scalars/blob/master/src/scalars/NonEmptyString.ts

const validate = (value: unknown, ast?: ASTNode) => {
  if (typeof value !== 'string') {
    throw new GraphQLError(
      `Value is not a string: ${value}`,
      ast ? { nodes: ast } : undefined
    )
  }

  if (value.trim().length === 0) {
    throw new GraphQLError(
      `Value cannot be an empty string: ${value}`,
      ast ? { nodes: ast } : undefined
    )
  }

  if (value.trim().length > 191) {
    throw new GraphQLError(
      `Value cannot be longer than 191 characters.`,
      ast ? { nodes: ast } : undefined
    )
  }

  return value
}

export const SafeStringResolver: GraphQLScalarType =
  /*#__PURE__*/ new GraphQLScalarType({
    name: 'SafeString',

    description: 'A string that cannot be passed as an empty value',

    serialize: validate,

    parseValue: validate,

    parseLiteral(ast) {
      if (ast.kind !== Kind.STRING) {
        throw new GraphQLError(
          `Can only validate strings but got a: ${ast.kind}`,
          { nodes: ast }
        )
      }
      return validate(ast.value, ast)
    },
    extensions: {
      codegenScalarType: 'string',
      jsonSchema: {
        title: 'SafeString',
        type: 'string',
        minLength: 1,
      },
    },
  })

export const SafeStringTypeDefinition = 'scalar SafeString'
