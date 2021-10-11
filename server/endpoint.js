const express = require('express')
const fileUpload = require('express-fileupload')
const fs = require('fs/promises')

function createRouter(processor) {
  const router = express.Router()

  router.post('/upload', async (req, res) => {
    const filePath = req.files.file.tempFilePath 
    await processor(filePath)
    await fs.unlink(filePath)
    res.end()
  })
  return router
}

function configureFileUpload() {
  return fileUpload({
    useTempFiles: true
  })
}

module.exports = function (processor) {
  return [
    configureFileUpload(),
    createRouter(processor)
  ]
}
