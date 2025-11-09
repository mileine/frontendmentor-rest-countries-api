import { useContext, FC, useEffect, useState } from 'react';
import AppContext, { AppContextType } from '../../context/AppContext'
import { ReactComponent as DarkIcon } from '../../assets/icon-dark.svg'
import { ReactComponent as LightIcon} from '../../assets/icon-light.svg'

const SwitchButton: FC = () => {
  const { appState, toggleTheme }: AppContextType = useContext(AppContext)
  const [themeLight, setThemeLight] = useState(true)

  useEffect(() => {
    setThemeLight(appState.themeLight)
  }, [appState.themeLight])

  return (
    <button 
      className="flex items-center gap-2 text-xs sm:text-sm font-semibold transition-colors hover:opacity-80"
      style={{ 
        color: appState.themeLight ? 'hsl(200, 15%, 8%)' : 'hsl(0, 0%, 100%)'
      }}
      onClick={() => toggleTheme()}
    >
      {themeLight ? <LightIcon className="w-4 h-4" /> : <DarkIcon className="w-4 h-4" />}
      <span>Dark Mode</span>
    </button>
  );
};

export default SwitchButton;