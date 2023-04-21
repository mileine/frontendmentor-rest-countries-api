import { useEffect, useState } from 'react'
import './App.scss'
import { formatCountryData } from './utils/utils'
import { CountryType } from './context/CountriesContext'
import { api } from './services/api'
import countryData from './data/mock.json'

function App() {
  const initialState: CountryType = formatCountryData(countryData[0])
  // DUNNO: como faço essa linha funcionar sem ter um initialState? 👇
  const [country, setCountry] = useState(() => initialState)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    api
      .get(`/name/brazil`)
      .then(response => setCountry(formatCountryData(response.data[0])))
      .catch(err => {
        console.error("ops! ocorreu um erro " + err)
      })
  },[])

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter') {
      api
      .get(`/name/${searchTerm}`)
      .then(response => setCountry(formatCountryData(response.data[0])))
      .catch(err => {
        console.error("ops! ocorreu um erro " + err)
      })
    }
  }

  return (
    <>
      <div className="header">
        <h1>Where in the world?</h1>
      </div>
      <div className="content">
        <input name="search" type="text" placeholder="busque por um país" value={searchTerm} onChange={(e)=>setSearchTerm(e.currentTarget.value)} onKeyDown={handleSearch}/>
        <div className="country-card">
          {
            country.flags.svg && 
            // TODO: Add loading for image
            <img className="flag" src={country.flags.svg} alt={country.flags.alt} width="50%"/>
          }
          <span>{country.name.common}</span>
          <span>{country.population}</span>
          <span>{country.capital}</span>
        </div>
      </div>
      <div className="footer">
        <span>WIP with ❤️ | A challenge by <a href="https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca">Frontend Mentor</a></span>
      </div>
    </>
  )
}

export default App
