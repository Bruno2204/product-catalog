import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';

export function CartItems() {
  const { items, updateQuantity, removeFromCart } = useCartStore();
  return (
    <div className='flex-1 flex flex-col divide-y divide-gray-100'>
      {items.map(({ product, quantity }) => (
        <div key={product.id} className='flex gap-4 py-5'>
          {/* Thumbnail */}
          <Link to={`/product/${product.id}`} className='shrink-0'>
            <img
              src={product.thumbnail}
              alt={product.title}
              className='w-20 h-20 rounded-lg object-cover border border-gray-200'
            />
          </Link>

          {/* Info */}
          <div className='flex flex-1 flex-col gap-1 min-w-0'>
            <Link
              to={`/product/${product.id}`}
              className='text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors truncate'
            >
              {product.title}
            </Link>
            <span className='text-xs text-gray-400 capitalize'>
              {product.category}
            </span>
            <span className='text-sm font-semibold text-gray-900 mt-auto'>
              ${(product.price * quantity).toFixed(2)}
            </span>
          </div>

          {/* Quantity + remove */}
          <div className='flex flex-col items-end justify-between shrink-0'>
            {/* Quantity selector */}
            <div className='flex items-center border border-gray-200 rounded-lg overflow-hidden'>
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                disabled={quantity <= 1}
                className='px-2.5 py-1.5 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40 cursor-pointer text-sm'
              >
                −
              </button>
              <span className='px-3 py-1.5 text-sm font-medium border-x border-gray-200 min-w-[36px] text-center'>
                {quantity}
              </span>
              <button
                onClick={() => updateQuantity(product.id, quantity + 1)}
                disabled={quantity >= product.stock}
                className='px-2.5 py-1.5 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40 cursor-pointer text-sm'
              >
                +
              </button>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeFromCart(product.id)}
              className='text-xs text-gray-400 hover:text-red-500 transition-colors cursor-pointer'
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
