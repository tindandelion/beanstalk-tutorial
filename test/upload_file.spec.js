const fs = require('fs')
const axios = require('axios')
const express = require('express')
const createEndpoint = require('~/server/endpoint')
const tempy = require('tempy')
const FormData = require('form-data')

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
        if (fs.existsSync(localPath)) {
          this.fileContent = fs.readFileSync(this.localPath, {
            encoding: 'utf-8',
          })
        }
      },
    }

    server = startApp(testProcessor.process.bind(testProcessor))
  })

  afterEach(async () => {
    await server.close()
  })

  it('uploads a file and passes it to the processor', async () => {
    const content = "Hello world it's me"
    await uploadFile(content)
    expect(testProcessor.fileContent).toEqual(content)
  })

  it('deletes the local file when the work is done', async () => {
    await uploadFile('')
    expect(fs.existsSync(testProcessor.localPath)).toBeFalsy()
  })

  async function uploadFile(content) {
    await tempy.write.task(content, async (localPath) => {
      const endpoint = `http://localhost:${server.address().port}/upload`
      const form = new FormData()
      form.append('file', fs.createReadStream(localPath))
      await axios.post(endpoint, form, { headers: { ...form.getHeaders() } })
    })
  }
})
