import { useContext, FC } from 'react';
import AppContext, { AppContextType } from '../../context/AppContext'
import './header.scss'
import SwitchButton from '../SwitchButton/SwitchButton';

const Header: FC = () => {
  const { appState }: AppContextType = useContext(AppContext)

  return (
    <div className={`header ${appState.themeLight? 'light' : 'dark'}`}>
      <div className="header__content">
        <h1>Where in the world?</h1>
        {/* <button onClick={() => toggleTheme()}>Switch theme</button> */}
        <SwitchButton />
      </div>
  </div>
  );
};

export default Header;