import { SuccessfulResponse, ErrorResponse } from '../types'

export const isResponseSuccess = (data: SuccessfulResponse | ErrorResponse): data is SuccessfulResponse => {
  return (data as SuccessfulResponse).results !== undefined
}
