import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore.ts';

export default function CartPage() {
  const { items, total, count, removeFromCart, updateQuantity, clearCart } =
    useCartStore();
  const navigate = useNavigate();

  // Empty state
  if (items.length === 0)
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

  return (
    <main className='max-w-4xl mx-auto px-4 py-10'>
      {/* ── Header ─────────────────────────────────── */}
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

      <div className='flex flex-col lg:flex-row gap-8'>
        {/* ── Cart items ─────────────────────────────── */}
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

        {/* ── Order summary ──────────────────────────── */}
        <div className='lg:w-72 shrink-0'>
          <div className='bg-gray-50 rounded-xl border border-gray-200 p-6 sticky top-24'>
            <h2 className='text-base font-semibold text-gray-900 mb-4'>
              Order summary
            </h2>

            {/* Line items */}
            <div className='flex flex-col gap-2 text-sm mb-4'>
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className='flex justify-between text-gray-600'
                >
                  <span className='truncate pr-4 max-w-[160px]'>
                    {product.title}
                  </span>
                  <span className='shrink-0'>
                    {quantity} × ${product.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className='border-t border-gray-200 pt-4 mb-6'>
              <div className='flex justify-between text-sm text-gray-600 mb-1'>
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-sm text-gray-600 mb-1'>
                <span>Shipping</span>
                <span className='text-green-600'>Free</span>
              </div>
              <div className='flex justify-between font-semibold text-gray-900 text-base mt-3'>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout button */}
            {true ? (
              <button
                onClick={() => navigate('/checkout')}
                className='w-full py-3 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer'
              >
                Proceed to checkout
              </button>
            ) : (
              <div className='flex flex-col gap-2'>
                <Link
                  to='/login'
                  className='w-full py-3 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors text-center'
                >
                  Login to checkout
                </Link>
                <p className='text-xs text-gray-400 text-center'>
                  You need an account to place an order.
                </p>
              </div>
            )}

            {/* Continue shopping */}
            <Link
              to='/'
              className='block text-center text-sm text-gray-400 hover:text-gray-700 transition-colors mt-4'
            >
              ← Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
