import {  FC, useState, useEffect } from 'react';
import { CountryType } from '../../context/AppContext'
import './home.scss'
import { formatCountryData } from '../../utils/utils';
import { api } from '../../services/api';
import CountryCard from '../../components/CountryCard/CountryCard';
import countryData from '../../data/mock.json'
import CountriesContainer from '../../components/CountriesContainer/CountriesContainer';

const Home: FC = () => {
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


  const handleSearch = () => {
    api
    .get(`/name/${searchTerm}`)
    .then(response => setCountry(formatCountryData(response.data[0])))
    .catch(err => {
      console.error("ops! ocorreu um erro " + err)
    })
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
    <div className="home">
      <input name="search" type="text" placeholder="search for a country..." value={searchTerm} onChange={(e)=>setSearchTerm(e.currentTarget.value)} onKeyDown={handleSearch}/>
      {/* <div className="countries-container"> */}
        <h3>search result</h3>
        <CountryCard country={country}/>
      {/* </div>      */}
      <div className="filter-options">
      <h3>view other countries</h3>
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
      { countries && 
        <CountriesContainer countries={countries} />
      }
    </div>
  );
};

export default Home;