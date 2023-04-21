import { FC, useContext, useEffect, useState } from 'react';
import AppContext, { AppContextType, CountryType } from '../../context/AppContext'
import './countryDetails.scss'
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { formatCountryData } from '../../utils/utils';

const CountryDetails: FC = () => {
  const { appState }: AppContextType = useContext(AppContext)
  const [country, setCountry] = useState(()=> ({} as CountryType))
  const { id } = useParams()

  useEffect(() => {
    api
      .get(`/alpha?codes=${id}`)
      .then(response => {
        const countryFound = formatCountryData(response.data[0]) 
        console.log('countryFound')
        console.log(countryFound) 
        
        setCountry({...country, ...countryFound })    
      })
      .catch(err => {
        console.error("ops! ocorreu um erro " + err)
      })
    console.log('country')
    console.log(country)
    },[])

  return (
   <div className={`country-details-page ${appState.themeLight? 'light' : 'dark'}`}>
    <span>Country details: </span>
    <span>{country?.name?.common},</span>

    { (country?.name !== undefined) &&
      <span>{country?.population}</span>
    }
   </div>
  );
};

export default CountryDetails;