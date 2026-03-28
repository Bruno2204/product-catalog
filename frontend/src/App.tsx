import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage2';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar2 from './components/Navbar2.tsx';

function App() {
  return (
    <BrowserRouter>
      <Navbar2 />
      <Routes>
        <Route path='/' element={<CatalogPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
