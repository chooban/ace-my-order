const fs = require('fs')

const nodeModules = {}
fs.readdirSync('node_modules')
  .filter(item => ['.bin'].indexOf(item) === -1)  // exclude the .bin folder
  .forEach((mod) => {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
  externals: nodeModules
}
