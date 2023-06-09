import { CountryType } from "../context/AppContext"

export const formatCountryData = (data: any) => {
  const countryData: CountryType = {
    codes: {
      cca2: data?.cca2,
      cca3: data?.cca2,
      ccn3: data?.ccn3,
      cioc: data?.cioc
    },
    name: {
      common: data?.name?.common,
      official: data?.name?.official,
      nativeName: data?.name?.nativeName,
    },
    capital: data?.capital,
    region: data?.region,
    subregion: data?.subregion,
    population: data?.population,
    languages: data?.languages,
    currencies: data?.currencies,
    borderCountries: data?.borders,
    tdl: data?.tld,
    flags: {
      svg: data?.flags?.svg,
      alt: data?.flags?.alt
    }
  }
  return countryData
}