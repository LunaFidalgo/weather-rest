const express = require('express')
const supertest = require('supertest')

const mod = require('../router')

describe('Base Router', () => {
  let request
  const mockMiddleware = (req, res, next) => next()
  const mockResponse = (req, res) => res.send()

  beforeEach(() => {
    const app = express()

    const router = mod({
      config: { env: 'production' },
      containerMiddleware: mockMiddleware,
      loggerMiddleware: mockMiddleware,
      errorHandler: mockMiddleware,
      errorMiddleware: mockMiddleware,
      userMiddleware: mockMiddleware,
      apiDocs: mockResponse
    })

    router.get('/ping', (req, res) => {
      res.send({ status: 'ok' })
    })

    app.use(router)

    request = supertest(app)
  })

  test('It respond to a basic request', done => {
    return request
      .get('/ping')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(err).toBeNull()
        expect(res.body).toMatchObject({ status: 'ok' })
        done()
      })
  })

  test('No extra endpoints', done => {
    const app = express()
    const mockMiddleware = (req, res, next) => next()
    const router = mod({
      config: { env: 'test' },
      containerMiddleware: mockMiddleware,
      loggerMiddleware: mockMiddleware,
      errorHandler: mockMiddleware,
      errorMiddleware: mockMiddleware,
      userMiddleware: mockMiddleware,
      apiDocs: null
    })

    router.get('/ping', (req, res) => res.send({ status: 'ok' }))

    app.use(router)

    request = supertest(app)

    return Promise.all([
      request.get('/ping').expect(200)
    ]).then(() => done())
  })
})
