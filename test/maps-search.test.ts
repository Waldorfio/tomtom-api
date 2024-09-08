import axios from 'axios'
import { tomtomConfig } from '../src/config'
import { config } from 'dotenv'
import { describe } from '@jest/globals'
import { getPlaceAutocomplete } from '../src/maps-api'
import { getAutoCompleteDetails } from '../src'
import { Address } from '../src/types'

config()

// These are end-to-end tests and need an api key
describe('Tomtom Places E2E Tests', () => {
  const config = tomtomConfig()
  let apiKey
  let apiVer 

  beforeAll(async () => {
    apiKey = config.apiKey
    apiVer = config.apiVer

    if (!apiKey || !apiVer) {
      fail(new Error(`Missing environment variables: ${!apiKey ? 'API Key' : ''}${!apiKey && !apiVer ? ' and ' : ''}${!apiVer ? 'API Version' : ''}`))
    }
  })

  describe('getAutoCompleteDetails', () => {
    it('returns a promise', () => {
      const res = getAutoCompleteDetails('Charlotte Street')
      expect(res).toBeInstanceOf(Promise)
    })

    it('can fetch from the autocomplete api', async () => {
      const res = await getAutoCompleteDetails('Charlotte Street')
      expect((res as Address[])).toBeDefined()
      const firstRes = res[0]
      expect(firstRes).toHaveProperty('placeId')
      expect(firstRes).toHaveProperty('streetNumber')
      expect(firstRes).toHaveProperty('countryCode')
      expect(firstRes).toHaveProperty('country')
      expect(firstRes).toHaveProperty('freeformAddress')
      expect(firstRes).toHaveProperty('municipality')
    })

    it('handles invalid address type', () => {
      expect(getAutoCompleteDetails(123 as unknown as string)).rejects.toThrow()
    })
  })

  describe('getPlaceAutocomplete', () => {
    it('handles no results', async () => {
      const res = await getPlaceAutocomplete(apiKey, apiVer, 'asfasffasfasafsafs')
      expect(res).toStrictEqual([])
    })

    it('returns mapped results for a a valid call', async () => {
      const result = await getPlaceAutocomplete(apiKey, apiVer, 'Charlotte Street')
      expect(result).toBeDefined()
      expect(Array.isArray(result)).toBe(true)
    })

    it('throws error on invalid api key', async () => {
      expect(getPlaceAutocomplete('invalidapikey', apiVer, 'Charlotte Street')).rejects.toThrow()
    })

    it('throws error on invalid api version', async () => {
      expect(getPlaceAutocomplete(apiKey, '0', 'Charlotte Street')).rejects.toThrow()
    })

    it('only returns Australian addresses', async () => {
      const res = await getPlaceAutocomplete(apiKey, apiVer, 'Charlotte Street')

      expect(Array.isArray(res)).toBe(true)
      if (Array.isArray(res)) {
        expect(res.length).toBeGreaterThan(0)
      } else {
        throw new Error('Expected array but received error')
      }

      res.forEach(result => {
        expect(result).toHaveProperty('country')
        expect(result.country).toBe('Australia')
      })
    })

    it('throws error on emtpy address', async () => {
      expect(getPlaceAutocomplete(apiKey, apiVer, '')).rejects.toThrow()
    })
  })
})
