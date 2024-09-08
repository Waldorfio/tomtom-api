import { getPlaceAutocomplete } from './maps-api'

export async function getAutoCompleteDetails(address: any): Promise<any> {
  const apiKey = process.env.TOMTOM_API_KEY
  const apiVer = process.env.TOMTOM_API_VERSION

  if (!apiKey || !apiVer) {
    throw new Error(`Missing environment variables: ${!apiKey ? 'API Key' : ''}${!apiKey && !apiVer ? ' and ' : ''}${!apiVer ? 'API Version' : ''}`);
  }

  try {
    const res = await getPlaceAutocomplete(apiKey, apiVer, address)
    return res
  } catch (err) {
    console.error(err)
  }
}
