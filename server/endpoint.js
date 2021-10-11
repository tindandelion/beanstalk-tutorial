const express = require('express')
const fileUpload = require('express-fileupload')
const fs = require('fs/promises')

function createRouter(processor) {
  const router = express.Router()

  router.post('/upload', async (req, res) => {
    if (!req.files || !req.files.content) {
      res.status(400).send('Expected a file "content" to be uploaded')
    } else {
      const filePath = req.files.content.tempFilePath
      await processor(filePath)
      await fs.unlink(filePath)
      res.status(200)
    }
    res.end()
  })
  return router
}

function configureFileUpload() {
  return fileUpload({
    useTempFiles: true,
  })
}

module.exports = function (processor) {
  return [configureFileUpload(), createRouter(processor)]
}
