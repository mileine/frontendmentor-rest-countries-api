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

  useEffect(() => {
    api
      .get('/name/brazil')
      .then(response => setCountry(formatCountryData(response.data[0])))
      .catch(err => {
        console.error("ops! ocorreu um erro " + err)
      })
  },[])

  return (
    <>
      <h1>Where in the world?</h1>
      {
        country.flags.svg && 
        <img src={country.flags.svg} alt={country.flags.alt} width="50%"/>
      }
    </>
  )
}

export default App
