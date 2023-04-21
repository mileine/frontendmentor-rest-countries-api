import { useContext } from 'react'
import './styles/App.scss'
import Header from './components/Header/Header'
import AppContext, { AppContextType } from './context/AppContext'
import Home from './pages/Home/Home'

function App() {
  const { appState }: AppContextType = useContext(AppContext)


  return (
    <div className={`app ${appState.themeLight ? 'theme--light': 'theme--dark'}`}>
      <Header />
      <Home />
      <div className="footer">
        <span>This is a <a href="https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca">Frontend Mentor</a> challenge | WIP with lots of ❤️ | <a href="https://github.com/mileine/frontendmentor-rest-countries-api">View on Github</a>  </span>
      </div>
    </div>
  )
}

export default App
