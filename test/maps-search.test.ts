import { tomtomConfig } from '../src/config'
import { config } from 'dotenv'
import { describe } from '@jest/globals'
import { getPlaceAutocomplete } from '../src/maps-api'
import { getAutoCompleteDetails } from '../src'

config()


// These are end-to-end tests and need an api key
describe('Tomtom Places E2E Tests', () => {
  const config = tomtomConfig()

  beforeAll(() => {
    if (!config.apiKey || !config.apiVer) {
      throw new Error(`Missing environment variables: ${!config.apiKey ? 'API Key' : ''}${!config.apiKey && !config.apiVer ? ' and ' : ''}${!config.apiVer ? 'API Version' : ''}`);
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
      const res = await getPlaceAutocomplete(config.apiKey, config.apiVer, 'asfasffasfasafsafs')
      expect(res).toStrictEqual([])
    })

    it('throws error on invalid api key', async () => {
      expect(getPlaceAutocomplete('invalidapikey', config.apiVer, 'Charlotte Street')).rejects.toThrow()
    })

    it('throws error on invalid api version', async () => {
      expect(getPlaceAutocomplete(config.apiKey, '0', 'Charlotte Street')).rejects.toThrow()
    })

    it('only returns Australian addresses', async () => {
      const res = await getPlaceAutocomplete(config.apiKey, config.apiVer, 'Charlotte Street')

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
      expect(getPlaceAutocomplete(config.apiKey, config.apiVer, '')).rejects.toThrow()
    })
  })
})
