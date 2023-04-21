import { FC } from 'react';
import { CountryType } from '../../context/AppContext';
import CountryCard from '../CountryCard/CountryCard';
import './countriesContainer.scss'

interface Props {
  countries: CountryType[];
}

const CountriesContainer: FC<Props> = ({ countries }) => {

  return (
    <div className="countries-container">
      { 
          countries.length > 0? countries.map((country, index) => (
            <CountryCard country={country} key={index} />
          )) : ''
      }
    </div>
  );
};

export default CountriesContainer;