module.exports = class HttpResponse {
  static ok (data) {
    return {
      statusCode: 200,
      body: data
    }
  }

  static created (data) {
    return {
      statusCode: 201,
      body: data
    }
  }

  static badRequest (error) {
    return {
      statusCode: 400,
      body: error
    }
  }

  static notFound () {
    return {
      statusCode: 404,
      body: 'Not found'
    }
  }
}
