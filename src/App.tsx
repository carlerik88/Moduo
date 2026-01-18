import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Design-specific pages
import { ScandinavianHome, ScandinavianBuilder } from './designs/scandinavian';
import { CraftsmanHome, CraftsmanBuilder } from './designs/craftsman';
import { ModernHome, ModernBuilder } from './designs/modern';

// Shared pages
import ProductsPage from './pages/products/ProductsPage';
import CartPage from './pages/cart/CartPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';

// i18n
import './locales/i18n';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect to Scandinavian */}
        <Route path="/" element={<Navigate to="/scandinavian" replace />} />

        {/* Scandinavian Design Routes */}
        <Route path="/scandinavian" element={<ScandinavianHome />} />
        <Route path="/scandinavian/builder" element={<ScandinavianBuilder />} />
        <Route path="/scandinavian/products" element={<ProductsPage theme="scandinavian" />} />
        <Route path="/scandinavian/cart" element={<CartPage theme="scandinavian" />} />
        <Route path="/scandinavian/checkout" element={<CheckoutPage theme="scandinavian" />} />
        <Route path="/scandinavian/faq" element={<FaqPage theme="scandinavian" />} />
        <Route path="/scandinavian/contact" element={<ContactPage theme="scandinavian" />} />

        {/* Craftsman Design Routes */}
        <Route path="/craftsman" element={<CraftsmanHome />} />
        <Route path="/craftsman/builder" element={<CraftsmanBuilder />} />
        <Route path="/craftsman/products" element={<ProductsPage theme="craftsman" />} />
        <Route path="/craftsman/cart" element={<CartPage theme="craftsman" />} />
        <Route path="/craftsman/checkout" element={<CheckoutPage theme="craftsman" />} />
        <Route path="/craftsman/faq" element={<FaqPage theme="craftsman" />} />
        <Route path="/craftsman/contact" element={<ContactPage theme="craftsman" />} />

        {/* Modern Design Routes */}
        <Route path="/modern" element={<ModernHome />} />
        <Route path="/modern/builder" element={<ModernBuilder />} />
        <Route path="/modern/products" element={<ProductsPage theme="modern" />} />
        <Route path="/modern/cart" element={<CartPage theme="modern" />} />
        <Route path="/modern/checkout" element={<CheckoutPage theme="modern" />} />
        <Route path="/modern/faq" element={<FaqPage theme="modern" />} />
        <Route path="/modern/contact" element={<ContactPage theme="modern" />} />

        {/* Catch all - redirect to Scandinavian */}
        <Route path="*" element={<Navigate to="/scandinavian" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
