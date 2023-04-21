import { useContext, FC } from 'react';
import AppContext, { AppContextType } from '../../context/AppContext'
import './switchButton.scss'

const SwitchButton: FC = () => {
  const { appState, toggleTheme }: AppContextType = useContext(AppContext)

  return (
    <button className={`switch-button ${appState.themeLight? 'light' : 'dark'}`} onClick={() => toggleTheme()}>
      {/* [DUNNO] How do I use images from folder assets? */}
      <img className="switch-button__icon" src={appState.themeLight? '/public/icon-light.svg': '/public/icon-dark.svg'} alt=""/>
      <span>Dark Theme</span>
    </button>
  );
};

export default SwitchButton;