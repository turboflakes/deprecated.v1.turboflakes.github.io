if (process.env.NODE_ENV === 'production') {
  module.exports = require('./getHost.prod')
} else {
  module.exports = require('./getHost.dev')
}
