import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import Layout from './components/Layout/Layout';
import Landing from './pages/Landing';
import Almusfih from './pages/Almusfih';
import Admin from './pages/Admin';
import Reviewer from './pages/Reviewer';

const App: React.FC = () => {
  useEffect(() => {
    // Set initial direction based on language
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, []);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/almusfih" element={<Almusfih />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/reviewer" element={<Reviewer />} />
            </Routes>
          </Layout>
        </Router>
      </I18nextProvider>
    </Provider>
  );
};

export default App;