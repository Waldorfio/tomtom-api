import { tomtomConfig } from './config'
import { getPlaceAutocomplete } from './maps-api'

export async function getAutoCompleteDetails(address: string): Promise<any> {
  if (typeof address !== 'string') throw new Error('Invalid address type. Expected a string.')
  const config = tomtomConfig()
  try {
    const res = await getPlaceAutocomplete(config.apiKey, config.apiVer, address)
    return res
  } catch (err) {
    throw err
  }
}
