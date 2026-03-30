import { Link } from 'react-router-dom';

export function EmptyCart() {
  return (
    <main className='max-w-2xl mx-auto px-4 py-20 text-center'>
      <p className='text-4xl mb-4'>🛒</p>
      <h2 className='text-xl font-semibold text-gray-900 mb-2'>
        Your cart is empty
      </h2>
      <p className='text-sm text-gray-400 mb-8'>
        Add some products to get started.
      </p>
      <Link
        to='/'
        className='inline-block px-6 py-2.5 rounded-lg bg-gray-900 text-white text-sm hover:bg-gray-700 transition-colors'
      >
        Browse products
      </Link>
    </main>
  );
}
