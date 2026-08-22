import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { RootLayout } from './components/layout/RootLayout';
import { HomePage } from './features/home/HomePage';
import { ShopPage } from './features/shop/ShopPage';
import { ProductDetailsPage } from './features/shop/ProductDetailsPage';
import { CartDrawer } from './features/cart/components/CartDrawer';
import { CheckoutPage } from './features/checkout/CheckoutPage';
import { OrderDetailsPage } from './features/checkout/OrderSuccessPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <CartDrawer />
      
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="shop/:id" element={<ProductDetailsPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;