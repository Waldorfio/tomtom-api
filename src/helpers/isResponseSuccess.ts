import { SuccessfulResponse, ErrorResponse } from '../types'

export const isResponseSuccess = (data: SuccessfulResponse | ErrorResponse) => {
  const isSuccess = data?.status === 'success'
  if (isSuccess) {
    return true
  } else {
    return false
  }
}