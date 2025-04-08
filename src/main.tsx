import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import {
  AboutPage,
  LoginPage,
  RestaurantList,
  HomePage,
  ProductPage,
} from './pages/';
import { registerSW } from 'virtual:pwa-register';

import '../index.css';
import { AuthContextProvider, UserOrderContextProvider } from './context';
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
      <UserOrderContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/restaurants" element={<RestaurantList />} />
              <Route path="/product/:productId" element={<ProductPage />} />
            </Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </UserOrderContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
