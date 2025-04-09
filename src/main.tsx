import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import {
  AboutPage,
  LoginPage,
  RestaurantList,
  HomePage,
  ProductPage,
  YourOrdersPage,
} from './pages/';
import { registerSW } from 'virtual:pwa-register';

import '../index.css';
import { AuthContextProvider, UserOrderContextProvider } from './context';
import { ProtectedRoute } from './components/protected-route';
import { YourCartPage } from './pages/YourCartPage';
import { SupportPage } from './pages/SupportPage';

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
              <Route path="/your-cart" element={<YourCartPage />} />
              <Route path="/your-orders" element={<YourOrdersPage />} />
              <Route path="/support-contact" element={<SupportPage />} />
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
