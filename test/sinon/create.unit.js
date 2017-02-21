const test = require('tap').test
const { server, connector } = require('../utils/server').startPlainArrow()
const createMethod = require('../../lib/methods/create').create
const twilioAPI = require('../../utils/twilioAPI')(connector.config)
const sinon = require('sinon')
connector.twilioAPI = twilioAPI

test('### Create Call - Error Case ###', function (t) {
  // DATA STUFF
  const Model = server.getModel('call')
  const errorMessage = 'My error'
  function cbError (errorMessage) {}
  const cbErrorSpy = sinon.spy(cbError)

  // MOCKING STUFF
  const twilioAPIStubError = sinon.stub(
    twilioAPI,
    'createCall',
    // The same parameters as the real function
    (Model, values, number, callback) => {
      // This is the body of the mocked function from twilio API

      // This is the anonymous function inside create.js
      callback(errorMessage)
    }
  )

  // EXECUTION STUFF
  createMethod.bind(connector, Model, {}, cbErrorSpy)()
  t.ok(twilioAPIStubError.calledOnce)
  t.ok(cbErrorSpy.calledOnce)
  t.ok(cbErrorSpy.calledWith(errorMessage))

  twilioAPIStubError.restore()
  t.end()
})

test('### Create Call - Ok Case ###', function (t) {
  connector.twilioAPI = twilioAPI

  // DATA STUFF
  const Model = server.getModel('call')
  const data = 'MyData'
  function cbOk (errorMessage, data) {}
  const cbOkSpy = sinon.spy(cbOk)

  // MOCKING STUFF
  const twilioAPIStubOk = sinon.stub(
    twilioAPI,
    'createCall',
    // The same parameters as the real function
    (Model, values, number, callback) => {
      // This is the body of the mocked function from twilio API

      // This is the anonymous function inside create.js
      callback(null, data)
    }
  )

  // EXECUTION STUFF
  createMethod.bind(connector, Model, {}, cbOkSpy)()
  t.ok(twilioAPIStubOk.calledOnce)
  t.ok(cbOkSpy.calledOnce)
  t.ok(cbOkSpy.calledWith(null, data))

  twilioAPIStubOk.restore()
  t.end()
})