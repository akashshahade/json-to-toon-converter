import React from 'react';
import Logo from './Logo';
import { SunIcon, MoonIcon } from './Icons';

interface HeaderProps {
    currentView: 'converter' | 'about';
    setView: (view: 'converter' | 'about') => void;
    currentTheme: 'light' | 'dark';
    toggleTheme: () => void;
}

const NavLink: React.FC<{
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
}> = ({ isActive, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            isActive 
            ? 'text-gray-900 dark:text-white' 
            : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
        }`}
    >
        {children}
    </button>
);

const Header: React.FC<HeaderProps> = ({ currentView, setView, currentTheme, toggleTheme }) => {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <button onClick={() => setView('converter')} aria-label="Go to converter">
              <Logo />
            </button>
            <nav className="hidden md:flex items-center gap-2">
              <NavLink isActive={currentView === 'converter'} onClick={() => setView('converter')}>
                Converter
              </NavLink>
              <NavLink isActive={currentView === 'about'} onClick={() => setView('about')}>
                About TOON
              </NavLink>
            </nav>
          </div>
          <div className="flex items-center">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
            >
                {currentTheme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
            <div className="md:hidden ml-2">
                <select 
                    value={currentView} 
                    onChange={(e) => setView(e.target.value as 'converter' | 'about')}
                    className="bg-transparent text-sm font-medium text-gray-900 dark:text-white focus:outline-none"
                >
                    <option value="converter">Converter</option>
                    <option value="about">About TOON</option>
                </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;