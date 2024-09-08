import axios from 'axios'
import { config } from 'dotenv'
import { describe } from '@jest/globals'
import { getPlaceAutocomplete } from '../src/maps-api'
import { getAutoCompleteDetails } from '../src'

config()


// These are end-to-end tests and need an api key
describe('Tomtom Places E2E Tests', () => {
  const apiKey = process.env.TOMTOM_API_KEY
  const apiVer = process.env.TOMTOM_API_VERSION

  beforeAll(() => {
    if (!apiKey || !apiVer) {
      throw new Error(`Missing environment variables: ${!apiKey ? 'API Key' : ''}${!apiKey && !apiVer ? ' and ' : ''}${!apiVer ? 'API Version' : ''}`);
    }
  })

  describe('getAutoCompleteDetails', () => {
    
    it('returns a promise', () => {
      const res = getAutoCompleteDetails('Charlotte Street')
      expect(res).toBeInstanceOf(Promise)
    })

    it('can fetch from the autocomplete api', async () => {
      const res = await getAutoCompleteDetails('Charlotte Street')
      const firstRes = res[0]
      expect(firstRes).toHaveProperty('placeId')
      expect(firstRes).toHaveProperty('streetNumber')
      expect(firstRes).toHaveProperty('countryCode')
      expect(firstRes).toHaveProperty('country')
      expect(firstRes).toHaveProperty('freeformAddress')
      expect(firstRes).toHaveProperty('municipality')
    })
  })

  describe('getPlaceAutocomplete', () => {
    it('handles no results', async () => {
      const res = await getPlaceAutocomplete(apiKey, apiVer, 'asfasffasfasafsafs')
      expect(res).toStrictEqual([])
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

    it('handles error', async () => {
      expect(getPlaceAutocomplete(apiKey, apiVer, '')).rejects.toThrow()
    })
  })
})
