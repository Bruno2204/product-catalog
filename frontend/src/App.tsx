import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CatalogPage from './components/catalog/CatalogPage.tsx';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar.tsx';
import { useProductsStore } from '@/store/useProducsStore.ts';
import { useEffect } from 'react';
import { getCategories, getProducts } from '@/api/products.ts';
import ProductPage from './pages/ProductPage.tsx';

function App() {
  const setProducts = useProductsStore((s) => s.setProducts);
  const setCategories = useProductsStore((s) => s.setCategories);

  useEffect(() => {
    getCategories().then(setCategories);
    getProducts().then((res) => setProducts(res.products));
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<CatalogPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
