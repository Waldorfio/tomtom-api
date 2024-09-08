export type ErrorResponse = {
  errorText: string
  detailedError: {
    code: string
    message: string
    target: string
  }
  httpStatusCode: string
}
