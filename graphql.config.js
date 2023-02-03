// eslint-disable-next-line import/no-extraneous-dependencies
const { getPaths } = require('@redwoodjs/internal')

module.exports = {
  schema: getPaths().generated.schema,
}
