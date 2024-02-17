export class ApiError extends Error {
  constructor(message = "Unknown error happened on the server") {
    super(message)
    this.name = "ApiError"
  }
}
