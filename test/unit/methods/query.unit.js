const test = require('tap').test
const sinon = require('sinon')

const queryMethod = require('../../../lib/methods/query')['query']

const ENV = {}
const connectorUtils = require('../../utils/connectorUtils')
const models = connectorUtils.models
const options = {
  limit: 1,
  where: {
    region: 'US'
  }
}

test('connect', (t) => {
  connectorUtils.test.getConnectorDynamic(connectorUtils.connectorName, env => {
    t.ok(env.container)
    t.ok(env.connector)
    ENV.container = env.container
    ENV.connector = env.connector
    ENV.connector.sdk = require('../../../src/sdkFacade')(ENV.connector.config)
    ENV.connector.tools = connectorUtils.tools
    t.end()
  })
})

test('### query Call - Error Case ###', function (t) {
  const Model = ENV.container.getModel(models.call)

  const errorMessage = 'query error'
  const cbErrorSpy = sinon.spy()

  const sdkStubError = sinon.stub(
    ENV.connector.sdk,
    'query',
    (Model, id, callback) => {
      callback(errorMessage)
    }
  )

  const toolsStubError = sinon.stub(
    ENV.connector.tools,
    'createCollectionFromModel',
    (Model, modelsData, primaryKey) => {
      return []
    }
  )

  const toolsGetNameStub = sinon.stub(
    ENV.connector.tools,
    'getRootModelName',
    (Model) => {
      return { nameOnly: 'call', nameOnlyPlural: 'calls' }
    }
  )

  queryMethod.bind(ENV.connector, Model, options, cbErrorSpy)()
  t.ok(sdkStubError.calledOnce)
  t.ok(toolsStubError.notCalled)
  t.ok(toolsGetNameStub.calledOnce)
  t.ok(cbErrorSpy.calledOnce)
  t.ok(cbErrorSpy.calledWith(errorMessage))

  sdkStubError.restore()
  toolsStubError.restore()
  toolsGetNameStub.restore()

  t.end()
})

test('### query Call - Ok Case ###', function (t) {
  const Model = ENV.container.getModel(models.call)
  const data = 'TestData'
  const cbOkSpy = sinon.spy()

  const sdkStubOk = sinon.stub(
    ENV.connector.sdk,
    'query',
    (Model, options, callback) => {
      callback(null, data)
    }
  )

  const toolsStubOk = sinon.stub(
    ENV.connector.tools,
    'createCollectionFromModel',
    (Model, modelsData, primaryKey) => {
      return data
    }
  )

  const toolsGetNameStub = sinon.stub(
    ENV.connector.tools,
    'getRootModelName',
    (Model) => {
      return { nameOnly: 'call', nameOnlyPlural: 'calls' }
    }
  )

  queryMethod.bind(ENV.connector, Model, options, cbOkSpy)()
  t.ok(sdkStubOk.calledOnce)
  t.ok(toolsStubOk.calledOnce)
  t.ok(toolsGetNameStub.calledOnce)
  t.ok(cbOkSpy.calledOnce)
  t.ok(cbOkSpy.calledWith(null, data))

  sdkStubOk.restore()
  toolsStubOk.restore()
  toolsGetNameStub.restore()
  t.end()
})

test('### query availablePhoneNumbers - Error Case ###', function (t) {
  const Model = ENV.container.getModel(models.availablePhoneNumber)

  const errorMessage = 'query error'
  const cbErrorSpy = sinon.spy()

  const sdkStubError = sinon.stub(
    ENV.connector.sdk,
    'queryAvailablePhoneNumbers',
    (Model, id, callback) => {
      callback(errorMessage)
    }
  )

  const toolsStubError = sinon.stub(
    ENV.connector.tools,
    'createCollectionFromModel',
    (Model, modelsData, primaryKey) => {
      return []
    }
  )

  const toolsGetNameStub = sinon.stub(
    ENV.connector.tools,
    'getRootModelName',
    (Model) => {
      return { nameOnly: 'availablePhoneNumber', nameOnlyPlural: 'availablePhoneNumbers' }
    }
  )

  queryMethod.bind(ENV.connector, Model, options, cbErrorSpy)()
  t.ok(sdkStubError.calledOnce)
  t.ok(toolsStubError.notCalled)
  t.ok(toolsGetNameStub.calledOnce)
  t.ok(cbErrorSpy.calledOnce)
  t.ok(cbErrorSpy.calledWith(errorMessage))

  sdkStubError.restore()
  toolsStubError.restore()
  toolsGetNameStub.restore()

  t.end()
})

test('### query availablePhoneNumbers - Ok Case ###', function (t) {
  const Model = ENV.container.getModel(models.availablePhoneNumber)
  const data = 'TestData'
  const cbOkSpy = sinon.spy()

  const sdkStubOk = sinon.stub(
    ENV.connector.sdk,
    'queryAvailablePhoneNumbers',
    (Model, options, callback) => {
      callback(null, data)
    }
  )

  const toolsStubOk = sinon.stub(
    ENV.connector.tools,
    'createCollectionFromModel',
    (Model, modelsData, primaryKey) => {
      return data
    }
  )

  const toolsGetNameStub = sinon.stub(
    ENV.connector.tools,
    'getRootModelName',
    (Model) => {
      return { nameOnly: 'availablePhoneNumber', nameOnlyPlural: 'availablePhoneNumbers' }
    }
  )

  queryMethod.bind(ENV.connector, Model, options, cbOkSpy)()
  t.ok(sdkStubOk.calledOnce)
  t.ok(toolsStubOk.calledOnce)
  t.ok(toolsGetNameStub.calledOnce)
  t.ok(cbOkSpy.calledOnce)
  t.ok(cbOkSpy.calledWith(null, data))

  sdkStubOk.restore()
  toolsStubOk.restore()
  toolsGetNameStub.restore()
  t.end()
})

test('### query availablePhoneNumbers - Invalid Query Case ###', function (t) {
  const Model = ENV.container.getModel(models.availablePhoneNumber)
  const cbOkSpy = sinon.spy()
  options.where = {}

  const toolsGetNameStub = sinon.stub(
    ENV.connector.tools,
    'getRootModelName',
    (Model) => {
      return { nameOnly: 'availablePhoneNumber', nameOnlyPlural: 'availablePhoneNumbers' }
    }
  )

  queryMethod.bind(ENV.connector, Model, options, cbOkSpy)()
  t.ok(toolsGetNameStub.calledOnce)
  t.ok(cbOkSpy.calledOnce)

  toolsGetNameStub.restore()
  t.end()
})
