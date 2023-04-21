import { useContext, FC } from 'react';
import AppContext, { AppContextType } from '../../context/AppContext'
import './header.scss'

const Header: FC = () => {
  const { appState, toggleTheme }: AppContextType = useContext(AppContext)

  return (
    <div className={`header ${appState.themeLight? 'light' : 'dark'}`}>
      <div className="header__content">
        <h1>Where in the world?</h1>
        <button onClick={() => toggleTheme()}>Switch theme</button>
      </div>
  </div>
  );
};

export default Header;