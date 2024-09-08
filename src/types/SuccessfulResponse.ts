import { AutocompleteAddress } from './AutocompleteAddress'

export type SuccessfulResponse = {
  status: 'success'
  summary: {
    query: string
    queryType: string
    queryTime: number
    numResults: number
    offset: number
    totalresults: number
    fuzzyLevel: number
  }
  results: AutocompleteAddress[]
}