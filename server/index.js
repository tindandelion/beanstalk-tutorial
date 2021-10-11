const createEndpoint = require('./endpoint')

const router = createEndpoint((localPath) => {
  console.log('Processing file: ' + localPath)
})

module.exports = {
  path: '/api',
  handler: router
}

