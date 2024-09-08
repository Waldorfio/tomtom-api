import { tomtomConfig } from './config'
import { getPlaceAutocomplete } from './maps-api'

export async function getAutoCompleteDetails(address: any): Promise<any> {
  const config = tomtomConfig()
  try {
    const res = await getPlaceAutocomplete(config.apiKey, config.apiVer, address)
    return res
  } catch (err) {
    console.error(err)
  }
}
