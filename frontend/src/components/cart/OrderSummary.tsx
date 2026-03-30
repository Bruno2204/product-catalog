import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';

export function OrderSummary() {
  const navigate = useNavigate();
  const { items, total } = useCartStore();
  return (
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
  );
}
