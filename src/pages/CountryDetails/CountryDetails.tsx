import { FC, useContext, useEffect, useState } from 'react';
import AppContext, { AppContextType, CountryType } from '../../context/AppContext'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { formatCountryData } from '../../utils/utils';

const CountryDetails: FC = () => {
  const { appState }: AppContextType = useContext(AppContext)
  const [country, setCountry] = useState(()=> ({} as CountryType))
  const { id } = useParams()
  const { name } = useParams()
  const [borders, setBorders] = useState<string[]>(() => [])
  const navigate = useNavigate()

  useEffect(() => {
    if (id !== undefined) {
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
    if (name !== undefined) {
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

  const nativeNames = country?.name?.nativeName 
    ? Object.values(country.name.nativeName).map((n: any) => n.common).join(', ')
    : 'N/A';

  const currencies = country?.currencies 
    ? Object.values(country.currencies).map((c: any) => c.name).join(', ')
    : 'N/A';

  const languages = country?.languages 
    ? Object.values(country.languages).join(', ')
    : 'N/A';

  return (
    <div 
      className="min-h-screen transition-colors"
      style={{ backgroundColor: appState.themeLight ? 'hsl(0, 0%, 98%)' : 'hsl(207, 26%, 17%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-8 py-2 rounded-md mb-16 transition-all hover:opacity-80"
          style={{
            backgroundColor: appState.themeLight ? 'hsl(0, 0%, 100%)' : 'hsl(209, 23%, 22%)',
            color: appState.themeLight ? 'hsl(200, 15%, 8%)' : 'hsl(0, 0%, 100%)',
            boxShadow: appState.themeLight ? '0 2px 9px rgba(0, 0, 0, 0.05)' : '0 2px 4px rgba(0, 0, 0, 0.15)'
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        {/* Country Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-28 items-center">
          {/* Flag */}
          {country?.flags?.svg && (
            <img 
              className="w-full h-auto rounded-md" 
              src={country.flags.svg}
              alt={country.flags.alt || `${country?.name?.common} flag`}
              style={{
                boxShadow: appState.themeLight ? '0 2px 9px rgba(0, 0, 0, 0.05)' : '0 2px 4px rgba(0, 0, 0, 0.15)'
              }}
            />
          )}

          {/* Information */}
          <div style={{ color: appState.themeLight ? 'hsl(200, 15%, 8%)' : 'hsl(0, 0%, 100%)' }}>
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8">
              {country?.name?.common}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 mb-12">
              {/* Left Column */}
              <div className="space-y-2 text-sm sm:text-base">
                <p>
                  <span className="font-semibold">Native Name:</span>{' '}
                  <span className="font-light">{nativeNames}</span>
                </p>
                <p>
                  <span className="font-semibold">Population:</span>{' '}
                  <span className="font-light">{country.population?.toLocaleString()}</span>
                </p>
                <p>
                  <span className="font-semibold">Region:</span>{' '}
                  <span className="font-light">{country.region}</span>
                </p>
                <p>
                  <span className="font-semibold">Sub Region:</span>{' '}
                  <span className="font-light">{country.subregion || 'N/A'}</span>
                </p>
                <p>
                  <span className="font-semibold">Capital:</span>{' '}
                  <span className="font-light">{country.capital || 'N/A'}</span>
                </p>
              </div>

              {/* Right Column */}
              <div className="space-y-2 text-sm sm:text-base">
                <p>
                  <span className="font-semibold">Top Level Domain:</span>{' '}
                  <span className="font-light">{country.tdl?.join(', ') || 'N/A'}</span>
                </p>
                <p>
                  <span className="font-semibold">Currencies:</span>{' '}
                  <span className="font-light">{currencies}</span>
                </p>
                <p>
                  <span className="font-semibold">Languages:</span>{' '}
                  <span className="font-light">{languages}</span>
                </p>
              </div>
            </div>

            {/* Border Countries */}
            {borders && borders.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <h3 className="font-semibold text-base whitespace-nowrap">Border Countries:</h3>
                <div className="flex flex-wrap gap-2">
                  {borders.map((item, index) => (
                    <Link 
                      key={index}
                      to={`/country-details/name/${item}`}
                      className="px-6 py-1 rounded-sm text-sm transition-all hover:opacity-80"
                      style={{
                        backgroundColor: appState.themeLight ? 'hsl(0, 0%, 100%)' : 'hsl(209, 23%, 22%)',
                        color: appState.themeLight ? 'hsl(200, 15%, 8%)' : 'hsl(0, 0%, 100%)',
                        boxShadow: appState.themeLight ? '0 2px 9px rgba(0, 0, 0, 0.05)' : '0 2px 4px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;