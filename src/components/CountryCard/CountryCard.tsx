import { FC, useContext } from 'react';
import { CountryType } from '../../context/AppContext';
import AppContext, { AppContextType } from '../../context/AppContext'
import './countryCard.scss'
import { useNavigate } from 'react-router-dom';

interface Props {
  country: CountryType;
}

const CountryCard: FC<Props> = ({ country }) => {
  const { appState }: AppContextType = useContext(AppContext)
  const navigateTo = useNavigate()
  const handleClick = () => {
    let code = ""
    if (country.codes?.cca2 !== undefined) code = country.codes?.cca2
    else if (country.codes?.cca3 !== undefined) code = country.codes.cca3
    else if (country.codes?.ccn3 !== undefined) code = country.codes.ccn3
    else if (country.codes?.cioc !== undefined) code = country.codes.cioc 
    navigateTo(`/country-details/${code}`)
  }

  return (
    <div className={`country-card ${appState.themeLight? 'light' : 'dark'}`} onClick={handleClick}>
    {
      country?.flags?.svg && 
      // TODO: Add loading for image
      <img className="flag" src={country.flags.svg} alt={country.flags.alt} width="50%"/>
    }
    <span>{country?.name?.common}</span>
    <span>{country.population}</span>
    <span>{country.capital}</span>
  </div>
  );
};

export default CountryCard;