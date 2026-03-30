import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore.ts';
import type { Product } from '../../types';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart, isInCart } = useCartStore();
  const inCart = isInCart(product.id);

  return (
    <div className='bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col'>
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className='aspect-square h-48 hover:opacity-90 transition-opacity place-self-center'
        />
      </Link>

      <div className='p-4 flex flex-col flex-1 gap-2'>
        <span className='text-xs text-gray-400 uppercase tracking-wide'>
          {product.category}
        </span>

        <Link
          to={`/product/${product.id}`}
          className='text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors line-clamp-2 leading-snug'
        >
          {product.title}
        </Link>

        <div className='flex items-center justify-between mt-auto pt-3'>
          <span className='font-semibold text-gray-900'>
            ${product.price.toFixed(2)}
          </span>

          {product.stock === 0 ? (
            <span className='text-xs text-red-500 font-medium'>
              Out of stock
            </span>
          ) : (
            <button
              onClick={() => addToCart(product, 1)}
              disabled={inCart}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                inCart
                  ? 'bg-green-100 text-green-700 cursor-default'
                  : 'bg-gray-900 text-white hover:bg-gray-700'
              }`}
            >
              {inCart ? 'Added ✓' : 'Add to cart'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
