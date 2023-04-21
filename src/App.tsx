import { useEffect, useState } from 'react'
import './App.scss'
import { formatCountryData } from './utils/utils'
import { CountryType } from './context/CountriesContext'
import { api } from './services/api'
import countryData from './data/mock.json'
import CountryCard from './components/CountryCard/CountryCard'
import CountriesContainer from './components/CountriesContainer/CountriesContainer'

function App() {
  const initialState: CountryType = formatCountryData(countryData[0])
  const countriesInitialState: CountryType[] | any[] = []
  const regionOptions: string[] = ["Africa","America","Asia","Europe","Oceania"] 
  // [HELP!] Como faço essa linha funcionar sem ter um initialState? 👇
  const [country, setCountry] = useState(() => initialState)
  const [countries, setCountries] = useState(()=> countriesInitialState)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")

  useEffect(() => {
    // [HELP!] Como posso organizar jeito melhor essas chamadas fora deste arquivo?
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

  useEffect(() => {
    api
      .get(`/alpha?codes=DE,US,BR,IS,AF,AX,AL,DZ`)
      .then(response => {
        const updatedList: CountryType[] = []
        response.data.map((item: CountryType) => {
          updatedList.push(formatCountryData(item))
        })
        setCountries(updatedList)
        console.log(response.data)
      })
      .catch(err => {
        console.error("ops! ocorreu um erro " + err)
      })

  },[searchTerm])

  useEffect(()=>{
    if(selectedRegion !== "") {
      console.log(selectedRegion)
      api
      .get(`region/${selectedRegion}`)
      .then(response => {
        const updatedList: CountryType[] = []
        if(selectedRegion === "Asia") console.log(response.data)
        response.data.map((item: CountryType) => {
          updatedList.push(formatCountryData(item))
        })
        setCountries(updatedList)
        console.log(response.data)
      })
      .catch(err => {
        console.error("ops! ocorreu um erro " + err)
      })
    }
  },[selectedRegion])

  return (
    <>
      <div className="header">
        <h1>Where in the world?</h1>
        <button>Switch theme</button>
      </div>
      <div className="content">
        <div className="filter-options">
          <input name="search" type="text" placeholder="search for a country..." value={searchTerm} onChange={(e)=>setSearchTerm(e.currentTarget.value)} onKeyDown={handleSearch}/>
          {/* TODO: Turn select into component  */}
          <select name="" onChange={(e) => setSelectedRegion(e.currentTarget.value) }>
            <option>Filter by Region</option>
            {
              regionOptions.map((item, index) => (
                <>
                  <option key={index} value={item}>{item}</option>
                </>
              ))
            }
          </select>
        </div>
        <div className="countries-container">
          <h3>search result</h3>
          <CountryCard country={country}/>
        </div>     
        <h3>view other countries</h3>
        { countries && 
          <CountriesContainer countries={countries} />
        }
      </div>
      <div className="footer">
        <span>This is a <a href="https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca">Frontend Mentor</a> challenge | WIP with lots of ❤️ | <a href="https://github.com/mileine/frontendmentor-rest-countries-api">View on Github</a>  </span>
      </div>
    </>
  )
}

export default App
