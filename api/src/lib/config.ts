import { assertAndReturn } from '@will-ks/helpers'

const apiConfig = {
  secrets: {
    example: {
      key: assertAndReturn(process.env.EXAMPLE_KEY, 'process.env.EXAMPLE_KEY'),
    },
  },
  constants: {
    example: {
      name: assertAndReturn(
        process.env.EXAMPLE_NAME,
        'process.env.EXAMPLE_NAME'
      ),
    },
  },
}

export default apiConfig
