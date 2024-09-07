import axios from 'axios'
import { CountryCodesISO } from './types'

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutocomplete(
  key: string,
  version: string,
  address: string
) {
  const autocomplete = await axios.get(
    `https://api.tomtom.com/search/${version}/search/${address}.json'`,
    {
      params: {
        key,
        limit: 100,
        countrySet: CountryCodesISO.AUS
      },
    }
  )

  return autocomplete.data.results.map((result) => {
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
}
