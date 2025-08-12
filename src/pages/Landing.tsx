import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, Shield, FileCheck, ChevronRight } from 'lucide-react';
import { useAppSelector } from '../store/store';

const Landing: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isDark } = useAppSelector((state) => state.theme);

  const handleReportClick = () => {
    navigate('/almusfih');
  };

  const handleAdminClick = () => {
    navigate('/admin');
  };

  const handleReviewerClick = () => {
    navigate('/reviewer');
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
          isDark ? 'bg-red-900/20' : 'bg-red-50'
        }`}>
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        <h1 className={`text-5xl font-bold mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {t('landing.title')}
        </h1>
        <p className={`text-xl mb-8 ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {t('landing.subtitle')}
        </p>
        <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {t('landing.description')}
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {/* Report Violation Card */}
        <div className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } shadow-lg hover:shadow-xl`}>
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative p-8">
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${
              isDark ? 'bg-red-900/20' : 'bg-red-50'
            }`}>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t('landing.reportButton')}
            </h3>
            <p className={`text-base mb-6 leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Report violations securely and anonymously with detailed documentation and file attachments.
            </p>
            <button
              onClick={handleReportClick}
              className="inline-flex items-center space-x-2 text-red-500 hover:text-red-600 font-medium transition-colors group/button"
            >
<span>{t('landing.getStarted')}</span>
              <ChevronRight className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Admin Panel Card */}
        <div className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } shadow-lg hover:shadow-xl`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative p-8">
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${
              isDark ? 'bg-blue-900/20' : 'bg-blue-50'
            }`}>
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t('landing.adminButton')}
            </h3>
            <p className={`text-base mb-6 leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Comprehensive management dashboard to oversee all violation reports and assign reviewers.
            </p>
            <button
              onClick={handleAdminClick}
              className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-600 font-medium transition-colors group/button"
            >
<span>{t('landing.accessPanel')}</span>
              <ChevronRight className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Reviewer Panel Card */}
        <div className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } shadow-lg hover:shadow-xl`}>
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative p-8">
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${
              isDark ? 'bg-teal-900/20' : 'bg-teal-50'
            }`}>
              <FileCheck className="w-8 h-8 text-teal-500" />
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t('landing.reviewerButton')}
            </h3>
            <p className={`text-base mb-6 leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Review assigned violation cases with detailed assessment tools and recommendation system.
            </p>
            <button
              onClick={handleReviewerClick}
              className="inline-flex items-center space-x-2 text-teal-500 hover:text-teal-600 font-medium transition-colors group/button"
            >
              <span>{t('landing.startReview')}</span>
              <ChevronRight className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 rounded-2xl p-8 ${
        isDark ? 'bg-gray-800/50' : 'bg-white/50'
      } backdrop-blur-sm`}>
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
            isDark ? 'bg-green-900/20' : 'bg-green-50'
          }`}>
            <span className="text-2xl">🔒</span>
          </div>
          <h4 className={`text-lg font-semibold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Secure
          </h4>
          <p className={`text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            End-to-end encryption
          </p>
        </div>
        
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
            isDark ? 'bg-purple-900/20' : 'bg-purple-50'
          }`}>
            <span className="text-2xl">🌐</span>
          </div>
          <h4 className={`text-lg font-semibold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Multilingual
          </h4>
          <p className={`text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Arabic & English
          </p>
        </div>
        
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
            isDark ? 'bg-orange-900/20' : 'bg-orange-50'
          }`}>
            <span className="text-2xl">📱</span>
          </div>
          <h4 className={`text-lg font-semibold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Responsive
          </h4>
          <p className={`text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            All devices supported
          </p>
        </div>
        
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
            isDark ? 'bg-indigo-900/20' : 'bg-indigo-50'
          }`}>
            <span className="text-2xl">⚡</span>
          </div>
          <h4 className={`text-lg font-semibold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Fast
          </h4>
          <p className={`text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Real-time updates
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;