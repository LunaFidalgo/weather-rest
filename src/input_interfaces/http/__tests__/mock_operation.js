const mockAction = (emit, data) => {
  const action = { fns: {} }

  action.outputs = { [emit]: emit }

  action.on = (ev, fn) => {
    action.fns[ev] = jest.fn(fn)
    return action
  }
  action.execute = jest.fn(() => {
    action.fns[emit](data)
  })
  return action
}

module.exports = mockAction
