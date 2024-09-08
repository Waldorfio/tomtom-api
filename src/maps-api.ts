import axios from 'axios'
import { mapAutocompleteResults } from './helpers/mapAutocompleteResults'
import { CountryCodesISO, SuccessfulResponse } from './types'
import { isResponseSuccess } from './helpers/isResponseSuccess'

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutocomplete(key: string, version: string, address: string) {
  const { data } = await axios.get(`https://api.tomtom.com/search/${version}/search/${address}.json'`, {
    params: {
      key,
      limit: 100,
      countrySet: CountryCodesISO.AUS,
    },
  })
  if (isResponseSuccess(data)) {
    return mapAutocompleteResults(data as SuccessfulResponse)
  } else {
    throw new Error(data)
  }
}
