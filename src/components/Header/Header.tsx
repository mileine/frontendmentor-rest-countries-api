import { useContext, FC } from 'react';
import AppContext, { AppContextType } from '../../context/AppContext'

const Header: FC = () => {
  const { toggleTheme }: AppContextType = useContext(AppContext)

  return (
    <div className="header">
    <div className="header__content">
      <h1>Where in the world?</h1>
      <button onClick={() => toggleTheme()}>Switch theme</button>
    </div>
  </div>
  );
};

export default Header;