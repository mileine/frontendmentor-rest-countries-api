import { useContext, FC } from 'react';
import { Link } from 'react-router-dom';
import AppContext, { AppContextType } from '../../context/AppContext'
import SwitchButton from '../SwitchButton/SwitchButton';

const Header: FC = () => {
  const { appState }: AppContextType = useContext(AppContext)

  return (
    <header 
      className="w-full shadow-light dark:shadow-dark transition-colors"
      style={{ 
        backgroundColor: appState.themeLight ? 'hsl(0, 0%, 100%)' : 'hsl(209, 23%, 22%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <Link to="/">
          <h1 
            className="text-sm sm:text-base md:text-xl lg:text-2xl font-extrabold cursor-pointer hover:opacity-80 transition-opacity"
            style={{ 
              color: appState.themeLight ? 'hsl(200, 15%, 8%)' : 'hsl(0, 0%, 100%)'
            }}
          >
            Where in the world?
          </h1>
        </Link>
        <SwitchButton />
      </div>
    </header>
  );
};

export default Header;