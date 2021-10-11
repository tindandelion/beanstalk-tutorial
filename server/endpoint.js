const express = require('express')
const tempy = require('tempy')

module.exports = function (processor) {
  const router = express.Router()

  router.post('/upload', async (req, res) => {
    await tempy.write.task('Hello world', (localPath) => {
      processor(localPath)
    })
    res.end()
  })
  return router
}
