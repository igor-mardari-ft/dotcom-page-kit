const esnext = require('@financial-times/dotcom-build-esnext')
const bundleSplitting = require('@financial-times/anvil-build-ft-js-code-splitting')

module.exports = {
  plugins: [
    esnext.plugin(),
    bundleSplitting.plugin(),
    plugin
  ],
  settings: {
    build: {
      entry: {
        main: './app/client.js'
      }
    }
  }
}

function plugin({ on }) {
  on('webpackConfig', ({ resource: webpackConfig }) => {
    webpackConfig.output.publicPath = '/assets/'
  })
  on('babelConfig', ({ resource: babelConfig }) => {
    babelConfig.presets.push('@babel/preset-react')
  })
}
