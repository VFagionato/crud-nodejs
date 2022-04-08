/* eslint-disable no-undef */
const PhoneValidator = require('../../../src/utils/helpers/phone-validator')

describe('Phone Validator', () => {
  test('should throw if phone is not provide', () => {
    const sut = new PhoneValidator()
    expect(sut.validate).toThrow()
  })

  test('should throw if str is provide', () => {
    const sut = new PhoneValidator()
    expect(() => sut.validate('11947298749')).toThrow()
  })

  test('should throw if short number is provide', () => {
    const sut = new PhoneValidator()
    expect(() => sut.validate(947293892)).toThrow()
  })

  test('should throw if long number is provide', () => {
    const sut = new PhoneValidator()
    expect(() => sut.validate(111867564782)).toThrow()
  })

  test('should return true if valid phone is provide', () => {
    const sut = new PhoneValidator()
    const isValid = sut.validate(71867567281)
    expect(isValid).toBe(true)
  })
})
