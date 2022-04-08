/* eslint-disable no-undef */
const MissingParamError = require('../../../src/utils/errors/missing-param-error')

class CPFValidator {
  constructor () {
    this.regex = /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/
  }

  validate (cpf) {
    if (!cpf) {
      throw new MissingParamError('cpf')
    }
    const isValid = this.regex.test(cpf)
    if (!isValid) {
      throw new Error('CPF invalid 400')
    }
    return true
  }
}

describe('CPF Validator', () => {
  test('should have regex property', () => {
    const sut = new CPFValidator()
    expect(sut.regex).not.toBeUndefined()
  })

  test('should throw if cpf not provided', async () => {
    const sut = new CPFValidator()
    expect(() => sut.validate()).toThrow(new MissingParamError('cpf'))
  })

  test('shoudl return true if CPF is valid', async () => {
    const sut = new CPFValidator()
    const cpfs = ['235.899.710-29', '217.119.250-04', '590.323.030-07', '590.323.030-07', '685.238.580-91']

    for (const cpf of cpfs) {
      const response = sut.validate(cpf)
      expect(response).toBe(true)
    }
  })
})
