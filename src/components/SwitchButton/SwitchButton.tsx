import { useContext, FC, useEffect, useState } from 'react';
import AppContext, { AppContextType } from '../../context/AppContext'
import { ReactComponent as DarkIcon } from '../../assets/icon-dark.svg'
import { ReactComponent as LightIcon} from '../../assets/icon-light.svg'

import './switchButton.scss'

const SwitchButton: FC = () => {
  const { appState, toggleTheme }: AppContextType = useContext(AppContext)
  const [themeLight, setThemeLight] = useState(true)

  useEffect(() => {
    setThemeLight(appState.themeLight)
  }, [appState.themeLight])

  return (
    <button className={`switch-button ${appState.themeLight? 'light' : 'dark'}`} onClick={() => toggleTheme()}>
      {
        themeLight ? <LightIcon /> : <DarkIcon />
      }
      <span>Dark Theme</span>
    </button>
  );
};

export default SwitchButton;