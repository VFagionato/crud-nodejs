/* eslint-disable no-undef */
const HttpResponse = require('../helpers/http-response')

const makeSut = () => {
  return new RegisterUserRouter()
}

class RegisterUserRouter {
  async route (httpRequest) {
    if (!httpRequest.body) {
      return HttpResponse.badRequest('body not present in request')
    }
    const { cpf, nome, telefone, email } = httpRequest.body
    if (!cpf || !nome || !telefone || !email) {
      return HttpResponse.badRequest('body must contain at least: cpf, name, phone, email')
    }
  }
}

describe('Register User Router', () => {
  test('should return 400 if httpRequest do not have a body', async () => {
    const sut = makeSut()
    const httpRequest = {}
    const response = await sut.route(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toBe('body not present in request')
  })

  test('should return 400 if any require param is missing', async () => {
    const sut = makeSut()
    const requests = [].concat(
      {
        body: {
          nome: 'Any Name',
          telefone: 71967876548,
          email: 'valid_email@mail.com'
        }
      },
      {
        body: {
          cpf: '345.234.544-01',
          telefone: 71967876548,
          email: 'valid_email@mail.com'
        }
      },
      {
        body: {
          cpf: '345.234.544-01',
          nome: 'Any name',
          email: 'valid_email@mail.com'
        }
      },
      {
        body: {
          cpf: '345.234.544-01',
          nome: 'Any name',
          telefone: 71967876548
        }
      }
    )

    for (const request of requests) {
      const response = await sut.route(request)
      expect(response.statusCode).toBe(400)
      expect(response.body).toBe('body must contain at least: cpf, name, phone, email')
    }
  })
})
