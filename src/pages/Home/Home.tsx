import {  FC, useState, useEffect, useContext } from 'react';
import { CountryType } from '../../context/AppContext'
import AppContext, { AppContextType } from '../../context/AppContext'
import { formatCountryData } from '../../utils/utils';
import { api } from '../../services/api';
import CountriesContainer from '../../components/CountriesContainer/CountriesContainer';

const Home: FC = () => {
  const { appState }: AppContextType = useContext(AppContext)
  const countriesInitialState: CountryType[] | any[] = []
  const regionOptions: string[] = ["Africa","America","Asia","Europe","Oceania"] 
  const [countriesResult, setCountriesResult] = useState(()=> countriesInitialState)
  const [countries, setCountries] = useState(()=> countriesInitialState)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")

  const handleSearch = () => {
    if (searchTerm.trim() === "") return;
    api
    .get(`/name/${searchTerm}`)
    .then(response => setCountriesResult(response.data.map((item: CountryType) => formatCountryData(item))))
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
    <main 
      className="min-h-screen transition-colors"
      style={{ backgroundColor: appState.themeLight ? 'hsl(0, 0%, 98%)' : 'hsl(207, 26%, 17%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row md:justify-between gap-10 mb-12">
          {/* Search Input */}
          <div 
            className="flex items-center gap-6 px-8 py-4 rounded-md w-full md:w-[480px]"
            style={{
              backgroundColor: appState.themeLight ? 'hsl(0, 0%, 100%)' : 'hsl(209, 23%, 22%)',
              boxShadow: appState.themeLight ? '0 2px 9px rgba(0, 0, 0, 0.05)' : '0 2px 4px rgba(0, 0, 0, 0.15)'
            }}
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ color: appState.themeLight ? 'hsl(0, 0%, 52%)' : 'hsl(0, 0%, 100%)' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              name="search" 
              type="text" 
              placeholder="Search for a country..." 
              value={searchTerm} 
              onChange={(e)=>setSearchTerm(e.currentTarget.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full bg-transparent outline-none text-sm"
              style={{ 
                color: appState.themeLight ? 'hsl(200, 15%, 8%)' : 'hsl(0, 0%, 100%)'
              }}
            />
          </div>
          
          {/* Filter Dropdown */}
          <select 
            name="region-filter" 
            onChange={(e) => setSelectedRegion(e.currentTarget.value)}
            className="px-6 py-4 rounded-md outline-none cursor-pointer text-sm w-full md:w-[200px]"
            style={{
              backgroundColor: appState.themeLight ? 'hsl(0, 0%, 100%)' : 'hsl(209, 23%, 22%)',
              color: appState.themeLight ? 'hsl(200, 15%, 8%)' : 'hsl(0, 0%, 100%)',
              boxShadow: appState.themeLight ? '0 2px 9px rgba(0, 0, 0, 0.05)' : '0 2px 4px rgba(0, 0, 0, 0.15)'
            }}
          >
            <option value="">Filter by Region</option>
            {regionOptions.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
        </div>

        {/* Search Results Section */}
        {countriesResult.length > 0 && (
          <div className="mb-12">
            <h3 
              className="text-xl font-semibold mb-6"
              style={{ color: appState.themeLight ? 'hsl(200, 15%, 8%)' : 'hsl(0, 0%, 100%)' }}
            >
              Search Results
            </h3>
            <CountriesContainer countries={countriesResult} />
          </div>
        )}

        {/* All Countries Section */}
        {countries && (
          <div>
            {countriesResult.length === 0 && selectedRegion && (
              <h3 
                className="text-xl font-semibold mb-6"
                style={{ color: appState.themeLight ? 'hsl(200, 15%, 8%)' : 'hsl(0, 0%, 100%)' }}
              >
                {selectedRegion}
              </h3>
            )}
            <CountriesContainer countries={countries} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;