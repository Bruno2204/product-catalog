import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../api/products.ts';
import { useCartStore } from '../store/useCartStore.ts';
import type { Product } from '../types.d.ts';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCartStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(false);
    getProduct(Number(id))
      .then((data) => {
        setProduct(data);
        setActiveImg(0);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ProductPageSkeleton />;

  if (error || !product)
    return (
      <main className='max-w-4xl mx-auto px-4 py-20 text-center'>
        <p className='text-gray-400 mb-4'>Product not found.</p>
        <button
          onClick={() => navigate('/')}
          className='text-sm px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors cursor-pointer'
        >
          Back to catalog
        </button>
      </main>
    );

  const inCart = isInCart(product.id);
  const outOfStock = product.stock === 0;
  const discounted = product.price * (1 - product.discountPercentage / 100);

  const handleAddToCart = () => {
    if (outOfStock || inCart) return;
    addToCart(product, quantity);
  };

  return (
    <main className='max-w-5xl mx-auto px-4 py-10'>
      {/* Back link */}
      <button
        onClick={() => navigate(-1)}
        className='text-sm text-gray-400 hover:text-gray-700 transition-colors mb-8 flex items-center gap-1 cursor-pointer'
      >
        ← Back
      </button>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* ── Left: images ─────────────────────────── */}
        <div className='flex flex-col gap-3'>
          {/* Main image */}
          <div className='rounded-xl overflow-hidden border border-gray-200 bg-gray-50 aspect-square'>
            <img
              src={product.images[activeImg] ?? product.thumbnail}
              alt={product.title}
              className='w-full h-full object-contain p-4'
            />
          </div>

          {/* Thumbnails — only show if more than one image */}
          {product.images.length > 1 && (
            <div className='flex gap-2 flex-wrap'>
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded-lg border-2 overflow-hidden shrink-0 cursor-pointer transition-colors ${
                    activeImg === i
                      ? 'border-gray-900'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} ${i + 1}`}
                    className='w-full h-full object-cover'
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: details ───────────────────────── */}
        <div className='flex flex-col gap-5'>
          {/* Category */}
          <span className='text-xs text-gray-400 uppercase tracking-wide'>
            {product.category}
          </span>

          {/* Title */}
          <h1 className='text-2xl font-semibold text-gray-900 leading-snug'>
            {product.title}
          </h1>

          {/* Rating + stock */}
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-1'>
              <span className='text-amber-400 text-sm'>
                {'★'.repeat(Math.round(product.rating))}
              </span>
              <span className='text-sm text-gray-400'>
                ({product.rating.toFixed(1)})
              </span>
            </div>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                outOfStock
                  ? 'bg-red-100 text-red-600'
                  : product.stock < 10
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-green-100 text-green-700'
              }`}
            >
              {outOfStock
                ? 'Out of stock'
                : product.stock < 10
                  ? `Only ${product.stock} left`
                  : 'In stock'}
            </span>
          </div>

          {/* Price */}
          <div className='flex items-baseline gap-3'>
            <span className='text-3xl font-bold text-gray-900'>
              ${discounted.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className='text-lg text-gray-400 line-through'>
                  ${product.price.toFixed(2)}
                </span>
                <span className='text-sm font-medium text-green-600'>
                  -{product.discountPercentage.toFixed(0)}%
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className='text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-5'>
            {product.description}
          </p>

          {/* Brand */}
          <p className='text-sm text-gray-400'>
            Brand:{' '}
            <span className='text-gray-700 font-medium'>{product.brand}</span>
          </p>

          {/* Quantity + Add to cart */}
          <div className='flex items-center gap-3 pt-2'>
            {/* Quantity selector */}
            <div className='flex items-center border border-gray-300 rounded-lg overflow-hidden'>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className='px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40 cursor-pointer'
              >
                −
              </button>
              <span className='px-4 py-2 text-sm font-medium border-x border-gray-300 min-w-[48px] text-center'>
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                disabled={quantity >= product.stock}
                className='px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40 cursor-pointer'
              >
                +
              </button>
            </div>

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              disabled={outOfStock || inCart}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
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
          </div>
        </div>
      </div>
    </main>
  );
}

// ── Loading skeleton ──────────────────────────────────────
function ProductPageSkeleton() {
  return (
    <main className='max-w-5xl mx-auto px-4 py-10'>
      <div className='h-4 w-12 bg-gray-200 rounded mb-8 animate-pulse' />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className='aspect-square rounded-xl bg-gray-200 animate-pulse' />
        <div className='flex flex-col gap-4 animate-pulse'>
          <div className='h-3 w-20 bg-gray-200 rounded' />
          <div className='h-7 w-3/4 bg-gray-200 rounded' />
          <div className='h-4 w-32 bg-gray-200 rounded' />
          <div className='h-8 w-28 bg-gray-200 rounded' />
          <div className='h-20 w-full bg-gray-200 rounded mt-4' />
          <div className='h-10 w-full bg-gray-200 rounded mt-4' />
        </div>
      </div>
    </main>
  );
}
