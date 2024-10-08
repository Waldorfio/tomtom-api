import { tomtomConfig } from './config'
import { getPlaceAutocomplete } from './maps-api'
import { Address, ErrorResponse } from './types'

export async function getAutoCompleteDetails(address: string): Promise<Address[] | ErrorResponse> {
  if (typeof address !== 'string') throw new Error('Invalid address type. Expected a string.')
  const config = tomtomConfig()
  try {
    const res = await getPlaceAutocomplete(config.apiKey, config.apiVer, address)
    return res as Address[]
  } catch (err) {
    throw err as ErrorResponse
  }
}
