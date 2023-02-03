import { assertAndReturn } from '@will-ks/helpers'

export const secrets = {
  example: {
    key: assertAndReturn(process.env.EXAMPLE_KEY),
  },
}
export const constants = {
  example: {
    name: assertAndReturn(process.env.EXAMPLE_NAME),
  },
}
