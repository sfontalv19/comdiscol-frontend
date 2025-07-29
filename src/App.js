// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage       from './pages/LoginPage';
import Home            from './pages/Home';
import QuoteConfigPage from './pages/NewQuote';

import './styles/base.css';
import './styles/loginPage.css';
import './styles/home.css';
import './styles/newQuotes.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"               element={<LoginPage />} />
        <Route path="/login"          element={<LoginPage />} />
        <Route path="/home"           element={<Home />} />
        <Route path="/nueva_cotizacion" element={<QuoteConfigPage />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
