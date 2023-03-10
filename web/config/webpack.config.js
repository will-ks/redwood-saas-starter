const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin')

/** @returns {import('webpack').Configuration} Webpack Configuration */
module.exports = (config, { mode }) => {
  if (mode === 'development') {
    // Add dev plugin
  }

  // Add custom rules for your project
  // config.module.rules.push(YOUR_RULE)

  // Add custom plugins for your project
  // config.plugins.push(YOUR_PLUGIN)
  config.plugins.push(new VanillaExtractPlugin())

  return config
}
