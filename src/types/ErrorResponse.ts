export type ErrorResponse = {
  status: 'error'
  errorText: string
  detailedError: {
    code: string
    message: string
    target: string
  }
  httpStatusCode: string
}