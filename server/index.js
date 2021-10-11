const express = require('express')

const router = express.Router()

router.post('/upload', (req, res) => {
  console.log('Track data called!')
  res.end()
})

module.exports = {
  path: '/api',
  handler: router
}