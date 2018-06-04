const Operation = require('../Operation')

describe('Operation class', () => {
  test('Instance', () => {
    const op = new Operation()
    expect(op instanceof Operation).toBe(true)
  })

  test('Throw without execute', () => {
    const op = new Operation()
    expect(() => {
      op.execute()
    }).toThrow(/execute\(\) implementation/)
  })

  describe('Extensions', () => {
    let opEx
    beforeEach(() => {
      class OpEx extends Operation {
        execute () {
          const { OUTPUT_1 } = this.outputs

          this.emit(OUTPUT_1, { value: true })
        }
      }

      OpEx.setOutputs(['OUTPUT_1', 'OUTPUT_2'])
      opEx = new OpEx()
    })

    test('Extend outputs', () => {
      expect(opEx instanceof Operation).toBe(true)
      expect(opEx.outputs).toMatchObject({
        OUTPUT_1: 'OUTPUT_1',
        OUTPUT_2: 'OUTPUT_2'
      })
    })

    test('Emit outputs', () => {
      expect(opEx instanceof Operation).toBe(true)

      const spy = jest.fn()
      opEx.on('OUTPUT_1', spy)
      const res = opEx.execute()
      expect(res).toBeFalsy()
      expect(spy).toHaveBeenCalled()
    })

    test('Can\' register invalid output', () => {
      expect(() => {
        opEx.on('RANDOM_OUTPUT', () => {
        })
      }).toThrow(/Invalid output "RANDOM_OUTPUT" to operation OpEx./)
    })
  })
})
