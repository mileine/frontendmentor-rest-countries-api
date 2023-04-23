import {  FC, useState, useEffect } from 'react';
import { CountryType } from '../../context/AppContext'
import './home.scss'
import { formatCountryData } from '../../utils/utils';
import { api } from '../../services/api';
import CountriesContainer from '../../components/CountriesContainer/CountriesContainer';

const Home: FC = () => {
  const countriesInitialState: CountryType[] | any[] = []
  const regionOptions: string[] = ["Africa","America","Asia","Europe","Oceania"] 
  // [HELP!] Como faço essa linha funcionar sem ter um initialState? 👇
  const [countriesResult, setCountriesResult] = useState(()=> countriesInitialState)
  const [countries, setCountries] = useState(()=> countriesInitialState)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")

  // useEffect(() => {
  //   // [HELP!] Como posso organizar jeito melhor essas chamadas fora deste arquivo?
  //   api
  //     .get(`/name/brazil`)
  //     .then(response => setCountry(formatCountryData(response.data[0])))
  //     .catch(err => {
  //       console.error("ops! ocorreu um erro " + err)
  //     })
  // },[])


  const handleSearch = () => {
    api
    .get(`/name/${searchTerm}`)
    .then(response => setCountriesResult(response.data.map(item => formatCountryData(item))))
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
        { (countriesResult.length > 0) && 
        <>
          <h3>search result</h3>
          <CountriesContainer countries={countriesResult} />
        </>
        }
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