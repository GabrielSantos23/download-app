import React, { useContext } from 'react';
import { ThemeContext } from '../Styles/themeContext';

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <div
      className={`w-full px-10 py-5  ${
        theme === 'dark'
          ? 'bg-darkTheme-card border-b-darktheme-line'
          : 'bg-lightTheme-card border-b-lightTheme-line'
      } lg:flex justify-between hidden `}
    >
      <div>logo</div>
      <div className='flex gap-2'>
        <p>Lorem</p>
        <p>Lorem</p>
        <p>Lorem</p>
        <p>Lorem</p>
        <button onClick={toggleTheme}>Lorem</button>
      </div>
    </div>
  );
};

export default Header;
