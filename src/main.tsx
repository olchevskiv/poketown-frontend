import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from "./AppRoutes";
import './global.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from "@/components/ui/sonner"
import ScrollToTop from './components/ScrollToTop';
import { OrderDetailsSheetProvider } from './contexts/OrderDetailsSheetContext';
import { CartItemsProvider } from './contexts/CartItemsContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,

    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <QueryClientProvider client={queryClient}>
      <Auth0ProviderWithNavigate>
        <CartItemsProvider >
          <OrderDetailsSheetProvider >
            <AppRoutes />
            <Toaster visibleToasts={1} position="top-right" richColors/>
          </OrderDetailsSheetProvider>
        </CartItemsProvider>
      </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
)
