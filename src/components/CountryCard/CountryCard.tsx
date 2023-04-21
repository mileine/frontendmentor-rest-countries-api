import { FC, useContext } from 'react';
import { CountryType } from '../../context/AppContext';
import AppContext, { AppContextType } from '../../context/AppContext'
import './countryCard.scss'

interface Props {
  country: CountryType;
}

const CountryCard: FC<Props> = ({ country }) => {
  const { appState }: AppContextType = useContext(AppContext)

  return (
    <div className={`country-card ${appState.themeLight? 'light' : 'dark'}`}>
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