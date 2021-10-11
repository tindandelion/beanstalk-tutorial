const fs = require('fs')
const axios = require('axios')
const express = require('express')
const tempy = require('tempy')

function createEndpoint(processor) {
  const router = express.Router()

  router.post('/upload', async (req, res) => {
    await tempy.write.task('Hello world', (localPath) => {
      processor(localPath)
      
    })
    res.end()
  })
  return router  
}

function startApp(processor) {
  const app = express()
  app.use(createEndpoint(processor))
  return app.listen()
}


describe('Uploading file to the server', () => {
  let server
  let testProcessor

  beforeEach(async () => {
    testProcessor = {
      localPath: '', 
      process(localPath) {
        this.localPath = localPath
        this.localPathExistsDuringProcess = fs.existsSync(localPath)
      }
    }

    server = startApp(testProcessor.process.bind(testProcessor))
  })

  afterEach(async () => {
    await server.close()
  })

  it('uploads a file and passes it to the processor', async () => {
    await uploadFile()
    expect(testProcessor.localPathExistsDuringProcess).toBeTruthy()
  })

  it('deletes the local file when the work is done', async () => {
    await uploadFile()
    expect(fs.existsSync(testProcessor.localPath)).toBeFalsy()
  })

  async function uploadFile() {
    const endpoint = `http://localhost:${server.address().port}/upload`
    await axios.post(endpoint)
  }

})
