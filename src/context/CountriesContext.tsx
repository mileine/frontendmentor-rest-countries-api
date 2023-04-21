// import { createContext, PropsWithChildren, useState } from "react";

export type CountryType = {
  name: {
    common: string,
    official: string,
    nativeName: any,
  },
  capital: string,
  region: string,
  subregion: string,
  population: number,
  languages: any,
  currencies: string[],
  borderCountries: string[],
  tdl: string[],
  flags: {
    svg: string,
    alt: string
  }
}