declare type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue }

interface JSON {
  // Overload default TypeScript JSON.stringify definition due to bug: https://github.com/microsoft/TypeScript/issues/18879
  stringify(
    value: unknown,
    replacer?: (number | string)[] | null,
    space?: string | number
  ): string | undefined
  // Overload JSON.parse with more useful typing, ref: https://github.com/microsoft/TypeScript/issues/1897
  parse(value: string): JSONValue
}
