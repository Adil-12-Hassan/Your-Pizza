import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingCartButton from './components/cart/FloatingCartButton';
import Cart from './components/cart/Cart';
import { useCartStore } from './store/cartStore';
import MainPage from './pages/MainPage';
import GalleryPage from './pages/GalleryPage';

export default function App() {
  const toggleCart = useCartStore((state) => state.toggleCart);

  return (
    <BrowserRouter>
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingCartButton onClick={toggleCart} />
      <Cart />
    </BrowserRouter>
  );
}