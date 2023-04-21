import { FC } from 'react';
import { CountryType } from '../../context/AppContext';

interface Props {
  country: CountryType;
}

const CountryCard: FC<Props> = ({ country }) => {
  return (
    <div className="country-card">
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