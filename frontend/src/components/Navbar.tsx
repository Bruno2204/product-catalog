import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';

export default function Navbar() {
  const { count } = useCartStore();

  return (
    <nav className='sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between'>
      <Link
        to='/'
        className='text-xl font-semibold text-gray-900 hover:text-gray-600 transition-colors'
      >
        MyShop
      </Link>

      <div className='flex items-center gap-6'>
        <Link
          to='/cart'
          className='relative text-sm text-gray-700 hover:text-gray-900 transition-colors'
        >
          Cart
          {count > 0 && (
            <span className='absolute -top-2 -right-3 bg-gray-900 text-white text-[10px] rounded-full w-[18px] h-[18px] flex items-center justify-center'>
              {count}
            </span>
          )}
        </Link>

        <Link
          to='/login'
          className='text-sm px-4 py-1.5 rounded-md bg-gray-900 text-white hover:bg-gray-700 transition-colors'
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
