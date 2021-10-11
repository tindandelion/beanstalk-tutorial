const express = require('express')
const createEndpoint = require('./endpoint')

const router = createEndpoint((localPath) => {
  console.log('Processing file: ' + localPath)
})

const app = express()
app.use(router)

module.exports = app

