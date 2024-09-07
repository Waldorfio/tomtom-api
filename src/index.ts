import { getPlaceAutocomplete } from './maps-api'

export async function getAutoCompleteDetails(address: any): Promise<any> {
  const apiKey = process.env.TOMTOM_API_KEY

  try {
    const res = await getPlaceAutocomplete(apiKey, address)
    return res
  } catch (err) {
    console.error(err)
  }
}
