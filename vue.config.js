var path = require('path');
var CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  publicPath: process.env.RAILS_ENV ? 'adminius' : '/',
  outputDir: process.env.RAILS_ENV ? '../public/adminius' : 'dist',

  chainWebpack: config => {
    config.resolve.alias.set('styles', path.resolve('src/assets/styles'))
    config.resolve.alias.set('router', path.resolve('src/router'))
    config.resolve.alias.set('store', path.resolve('src/store'))
    config.resolve.alias.set('views', path.resolve('src/router/views'))
    config.resolve.alias.set('components', path.resolve('src/components'))
    config.resolve.alias.set('utils', path.resolve('src/utils'))
    config.resolve.alias.set('state', path.resolve('src/state'))
    config.resolve.alias.set('services', path.resolve('src/services'))
  },

  configureWebpack: {
    plugins: [
      new CircularDependencyPlugin({
        // I was forced to allow circular deps for one component
        // This is required due to recursion in that component
        exclude: /(node_modules|src\/components)/,
        // include: /dir/,
        failOnError: true,
        allowAsyncCycles: true,
        cwd: process.cwd(),
      })
    ]
  },

  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
      },
    },
  }
}
