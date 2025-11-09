import { FC } from 'react';
import { CountryType } from '../../context/AppContext';
import CountryCard from '../CountryCard/CountryCard';

interface Props {
  countries: CountryType[];
}

const CountriesContainer: FC<Props> = ({ countries }) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 sm:gap-12 lg:gap-16">
      { 
        countries.length > 0 ? countries.map((country, index) => (
          <CountryCard country={country} key={index} />
        )) : null
      }
    </div>
  );
};

export default CountriesContainer;