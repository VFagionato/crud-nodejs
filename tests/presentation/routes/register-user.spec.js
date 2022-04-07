const HttpResponse = require("../helpers/http-response")

const makeSut = () => {
  return new RegisterUserRouter()
}

class RegisterUserRouter {
  async route (httpRequest) {
    if (!httpRequest.body) {
      return HttpResponse.badRequest('body not present in request')
    }
  }
}

describe('Register User Router', () => {
  test('should return 400 if httpRequest do not have a body', async () => {
    const sut = makeSut()
    const httpRequest = {}
    const response = await sut.route(httpRequest)
    expect(response.statusCode).toBe(400)
  })
})
