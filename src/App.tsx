import { useContext, useEffect } from 'react'
import Header from './components/Header/Header'
import AppContext, { AppContextType } from './context/AppContext'
import Home from './pages/Home/Home'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountryDetails from './pages/CountryDetails/CountryDetails'

function App() {
  const { appState }: AppContextType = useContext(AppContext)

  useEffect(() => {
    // Update the class on the html element for dark mode
    if (appState.themeLight) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }, [appState.themeLight])

  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country-details/code/:id" element={<CountryDetails />} />
          <Route path="/country-details/name/:name" element={<CountryDetails />} />
        </Routes>
        <footer 
          className="py-6 text-center text-xs transition-colors"
          style={{
            backgroundColor: appState.themeLight ? 'hsl(0, 0%, 98%)' : 'hsl(207, 26%, 17%)',
            color: appState.themeLight ? 'hsl(200, 15%, 8%)' : 'hsl(0, 0%, 100%)'
          }}
        >
          <span>
            This is a{' '}
            <a 
              href="https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca"
              className="font-semibold hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Frontend Mentor challenge
            </a>{' '}
           challenge | <a
              href="https://github.com/mileine/frontendmentor-rest-countries-api"
              className="font-semibold hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >View on github</a>          
          </span>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
