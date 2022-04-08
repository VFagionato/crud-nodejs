/* eslint-disable no-undef */

const MissingParamError = require('../../../src/utils/errors/missing-param-error')

const EmailValidator = require('../../../src/utils/helpers/email-validator')

describe('Email Validator', () => {
  test('should have regex property', () => {
    const sut = new EmailValidator()
    expect(sut.regex).not.toBeUndefined()
  })

  test('should throw if Email not provided', async () => {
    const sut = new EmailValidator()
    expect(() => sut.validate()).toThrow(new MissingParamError('email'))
  })

  test('shoudl return true if Email is valid', async () => {
    const sut = new EmailValidator()
    const Emails = ['valid@mail.com', 'any@test.com', 'valid@gmail.org', 'test@br.com.br', 'valid_mail@test.com.org']

    for (const Email of Emails) {
      const response = sut.validate(Email)
      expect(response).toBe(true)
    }
  })

  test('should throw if invalid email is provided', async () => {
    const sut = new EmailValidator()
    expect(() => sut.validate('invalid_mail')).toThrow()
  })
})
