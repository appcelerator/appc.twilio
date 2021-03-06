const test = require('tap').test
const server = require('../../utils/server')
const requester = require('../../utils/requester')

var SERVER
var REQUESTER

test('### START SERVER ###', function (t) {
  server.startHTTPArrow({}, arrow => {
    t.ok(arrow, 'Arrow has been started')
    SERVER = arrow
    REQUESTER = requester(SERVER.config)
    t.end()
  })
})

test('Should return proper status code when valid request is passed', t => {
  const id = 'SM998f7c270098420b82fd7c2c32fe2832'
  const modelName = 'message'

  REQUESTER.getData({ model: modelName, id: id }, (response, body) => {
    t.ok(body.success)
    t.equal(response.statusCode, 200, 'statusCode should be 200')
    t.end()
  })
})

test('Should return proper status code when valid request is passed to call endpoint', t => {
  const modelName = 'call'
  const id = 'CAaaa5541f73182afad749d857ced61d0b'

  REQUESTER.getDataByID({ model: modelName, id: id }, (response, body) => {
    t.ok(body.success)
    t.equal(response.statusCode, 200, 'status code should be 200')
    t.equal(body.call.status, 'busy')
    t.equal(body.call.priceUnit, 'USD')
    t.equal(body.call.duration, '0')
    t.end()
  })
})

test('Should return proper response when correct ID is passed to message endpoint', t => {
  const modelName = 'message'
  const id = 'SMed58f4e57f0b4bafb575654d09b7cb85'

  REQUESTER.getDataByID({ model: modelName, id: id }, (response, body) => {
    t.ok(body.success, 'Body success should be true')
    t.equal(response.statusCode, 200, 'status code should be 200')
    t.equal(body.message.sid, id)
    t.equal(body.message.status, 'delivered')
    t.end()
  })
})

test('### STOP SERVER ###', function (t) {
  SERVER.stop(function () {
    t.pass('Arrow has been stopped!')
    t.end()
  })
})
