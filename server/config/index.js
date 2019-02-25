const devConfig = require('./dev')
const prodConfig = require('./prod')

module.exports = process.env.NODE_ENV === 'develop' ? devConfig : prodConfig