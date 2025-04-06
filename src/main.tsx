import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { AboutPage, LoginPage, RestaurantList, HomePage } from './pages/';
import { registerSW } from 'virtual:pwa-register';

import '../index.css';
import { AuthContextProvider } from './context';
import { ProtectedRoute } from './components/protected-route';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New version available. Reload?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App is ready to work offline!');
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute />} />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>
);
