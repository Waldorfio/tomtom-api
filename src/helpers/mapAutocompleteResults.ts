import { SuccessfulResponse } from '../types'

export const mapAutocompleteResults = (data: SuccessfulResponse) => (
  data.results.map((result) => {
    const response = {
      placeId: result.id,
      streetNumber: result.address.streetNumber || '',
      countryCode: result.address.countryCode,
      country: result.address.country,
      freeformAddress: result.address.freeformAddress,
      municipality: result.address.municipality
    }
    return response
  })
)