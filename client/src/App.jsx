import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingCartButton from './components/cart/FloatingCartButton';
import Cart from './components/cart/Cart';
import { useCartStore } from './store/cartStore';
import MainPage from './pages/MainPage';
import GalleryPage from './pages/GalleryPage';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import ProtectedRoute from './components/common/ProtectedRoute';

function PublicLayout({ children }) {
  const toggleCart = useCartStore((state) => state.toggleCart);
  return (
    <>
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
      <FloatingCartButton onClick={toggleCart} />
      <Cart />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout><MainPage /></PublicLayout>} />
        <Route path="/gallery" element={<PublicLayout><GalleryPage /></PublicLayout>} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}