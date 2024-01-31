import './countryDetails.scss'

import AppContext, { AppContextType, CountryType } from '../../context/AppContext'
import { FC, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { api } from '../../services/api';
import { formatCountryData } from '../../utils/utils';

const CountryDetails: FC = () => {
  const { appState }: AppContextType = useContext(AppContext)
  const [country, setCountry] = useState(()=> ({} as CountryType))
  const { id } = useParams()
  const { name } = useParams ()
  const [borders, setBorders] = useState<string[]>(() => [])

  useEffect(() => {
    if (id!== undefined) {
      console.log(`id = ${id}`)
      api
      .get(`/alpha?codes=${id}`)
      .then(response => {
        const countryFound = formatCountryData(response.data[0]) 
        setCountry({...country, ...countryFound })
      })
      .catch(err => {
        console.error("ops! ocorreu um erro " + err)
      })
    }
    if (name!== undefined) {
      console.log(`name = ${name}`)
      api
        .get(`/name/${name}?fullText=true`)
        .then(response => {
          const countryFound = formatCountryData(response.data[0]) 
          setCountry({...country, ...countryFound })
        })
        .catch(err => {
          console.error("ops! ocorreu um erro " + err)
        })
      }
    console.log('country')
    console.log(country)
  },[id, name])

   useEffect(() => {
    console.log('country.borderCountries')
    console.log(country.borderCountries?.toString())
    let bordersCode = ""
    if(country?.borderCountries !== undefined) bordersCode = country.borderCountries.toString()
    const bordersFullName: string[] = []
    if(country.borderCountries !== undefined) {
      api
        .get(`/alpha?codes=${bordersCode}`)
        .then(response => {
          // [DUNNO] Problem with types
          response.data.map((item: { name: { common: string; }; }) => {
            bordersFullName?.push(item?.name?.common)
            console.log("borders")
            if (bordersFullName?.length > 0) setBorders(bordersFullName)
            console.log(bordersFullName)
          })
        })
        .catch(err => {
          console.error("ops! ocorreu um erro " + err)
        })
    }
  },[country.borderCountries])

  

  return (
   <div className={`country-details-page ${appState.themeLight? 'light' : 'dark'}`}>
    <div className="card">
      <div>
        { (country?.flags?.svg !== undefined) &&
          <img className='flag' src={country.flags.svg}></img>
        }
      </div>
      <div>
        <h2>{country?.name?.common}</h2>
        <div>{country?.population}</div>
        <div>{country?.region}</div>
        <div>{country?.capital}</div>      
           
        {
          borders && 
          <div>
            {
              borders.map(item => 
                <Link className='link' to={`/country-details/name/${item}`}>
                  <span className='country-details-page__border-country'>{item}</span>
                </Link>   
              )
            }
          </div>
        }
      </div>
    </div>
   </div>
  );
};

export default CountryDetails;