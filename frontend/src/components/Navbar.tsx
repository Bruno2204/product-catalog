import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore.ts';

export default function Navbar() {
  const count = useCartStore((s) => s.count);
  return (
    <nav className='flex justify-end gap-10 mr-5 mt-5'>
      <Link to='/'>Catalog</Link>
      <Link to='/cart'>
        Cart <span className=''>{count}</span>
      </Link>
      <Link to='/login'>Login</Link>
    </nav>
  );
}
