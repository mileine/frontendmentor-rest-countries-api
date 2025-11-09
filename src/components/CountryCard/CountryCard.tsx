import { FC, useContext } from 'react';
import { CountryType } from '../../context/AppContext';
import AppContext, { AppContextType } from '../../context/AppContext'
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
    navigateTo(`/country-details/code/${code}`)
  }

  return (
    <div 
      className="rounded-md overflow-hidden cursor-pointer transition-all hover:scale-105"
      style={{
        backgroundColor: appState.themeLight ? 'hsl(0, 0%, 100%)' : 'hsl(209, 23%, 22%)',
        boxShadow: appState.themeLight ? '0 2px 9px rgba(0, 0, 0, 0.05)' : '0 2px 4px rgba(0, 0, 0, 0.15)'
      }}
      onClick={handleClick}
    >
      {country?.flags?.svg && (
        <img 
          className="w-full h-40 object-cover" 
          src={country.flags.svg} 
          alt={country.flags.alt || `${country?.name?.common} flag`}
        />
      )}
      <div 
        className="p-6 pb-10"
        style={{ color: appState.themeLight ? 'hsl(200, 15%, 8%)' : 'hsl(0, 0%, 100%)' }}
      >
        <h2 className="text-lg font-extrabold mb-4">
          {country?.name?.common}
        </h2>
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-semibold">Population:</span>{' '}
            <span className="font-light">{country.population?.toLocaleString()}</span>
          </p>
          <p>
            <span className="font-semibold">Region:</span>{' '}
            <span className="font-light">{country.region}</span>
          </p>
          <p>
            <span className="font-semibold">Capital:</span>{' '}
            <span className="font-light">{country.capital}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;