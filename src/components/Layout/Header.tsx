 import React from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Globe, AlertTriangle, Home as HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { toggleTheme } from '../../store/slices/themeSlice';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isDark } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <header
      className={`w-full border-b transition-colors duration-200 ${
        isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg ${
                isDark ? 'bg-red-900/20' : 'bg-red-50'
              }`}
            >
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h1
                className={`text-xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {t('landing.title')}
              </h1>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Home Button */}
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isDark
                  ? 'hover:bg-gray-800 text-gray-300 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            >
              <HomeIcon className="w-4 h-4" />
              <span className="text-sm font-medium">{t('navigation.home')}</span>
            </Link>

            {/* Language Button */}
            <button
              onClick={toggleLanguage}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isDark
                  ? 'hover:bg-gray-800 text-gray-300 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {t('navigation.language')}
              </span>
            </button>

            {/* Theme Button */}
            <button
              onClick={handleThemeToggle}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'hover:bg-gray-800 text-gray-300 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
              title={t('navigation.theme')}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Logo */}
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-blue-900/20' : 'bg-blue-50'
              }`}
            >
              <span className="text-blue-500 font-bold text-lg">L</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
