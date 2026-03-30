import { useCartStore } from '../../store/useCartStore';

export function CartHeader() {
  const { count, clearCart } = useCartStore();
  return (
    <div className='flex items-center justify-between mb-8'>
      <div>
        <h1 className='text-2xl font-semibold text-gray-900'>Your cart</h1>
        <p className='text-sm text-gray-400 mt-1'>
          {count} {count === 1 ? 'item' : 'items'}
        </p>
      </div>
      <button
        onClick={clearCart}
        className='text-sm text-gray-400 hover:text-red-500 transition-colors cursor-pointer'
      >
        Clear all
      </button>
    </div>
  );
}
