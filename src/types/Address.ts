import { States } from './States'
import { CountryCodesISO } from './CountryCodesISO'

export type Address = {
  streetNumber?: string
  streetName: string
  municipalitySubdivision: string
  municipality: string
  countrySecondarySubdivision: string
  countryTertiarySubdivision: string
  countrySubdivision: string
  countrySubdivisionCode: States
  placeId: string
  postalCode: string
  extendedPostalCode: string
  countryCode: string
  country: string
  countryCodeISO3: CountryCodesISO
  freeformAddress: string
  countrySubdivisionName: string
  localName: string
}
