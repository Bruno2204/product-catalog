import { useCartStore } from '@/store/useCartStore.ts';
import type { Product } from '@/types.ts';

export function AddToCart({ product }: { product: Product }) {
  const increaseQuantity = useCartStore((s) => s.increaseQuantity);
  const decreaseQuantity = useCartStore((s) => s.decreaseQuantity);
  const addToCart = useCartStore((s) => s.addToCart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const inCart = useCartStore((s) => s.isInCart(product.id));
  const quantity = useCartStore(
    (s) => s.getCartItem(product.id)?.quantity ?? 0,
  );
  const outOfStock = product.stock === 0;

  const handleIncrease = () => {
    if (inCart) {
      increaseQuantity(product.id);
    } else {
      addToCart(product);
    }
  };

  const handleDecrease = () => {
    if (quantity === 1) {
      removeFromCart(product.id);
    } else {
      decreaseQuantity(product.id);
    }
  };
  return (
    <div className='transition-all duration-300'>
      {inCart ? (
        <div className='flex items-center border border-gray-300 rounded-lg overflow-hidden'>
          <button
            onClick={handleDecrease}
            disabled={quantity <= 0}
            className='px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40 cursor-pointer'
          >
            −
          </button>
          <span className='px-4 py-2 text-sm font-medium border-x border-gray-300 min-w-[48px] text-center'>
            {quantity}
          </span>
          <button
            onClick={handleIncrease}
            disabled={quantity >= product.stock}
            className='px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40 cursor-pointer'
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() => addToCart(product)}
          disabled={outOfStock || inCart}
          className={`py-2.5 px-6 rounded-lg text-sm font-medium transition-colors ${
            outOfStock
              ? 'bg-gray-100 text-gray-400 cursor-default'
              : inCart
                ? 'bg-green-100 text-green-700 cursor-default'
                : 'bg-gray-900 text-white hover:bg-gray-700 cursor-pointer'
          }`}
        >
          {outOfStock
            ? 'Out of stock'
            : inCart
              ? 'Added to cart ✓'
              : 'Add to cart'}
        </button>
      )}
    </div>
  );
}
