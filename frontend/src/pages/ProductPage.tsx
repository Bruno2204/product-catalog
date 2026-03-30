import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Product } from '../types.d.ts';
import { BackButton } from '@/components/product/BackButton.tsx';
import { ProductDetails } from '@/components/product/ProductDetails.tsx';
import { ProductImages } from '@/components/product/ProductImages.tsx';
import { useProductsStore } from '@/store/useProducsStore.ts';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const getProductByID = useProductsStore((s) => s.getProductByID);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(false);
    const product = getProductByID(Number(id));
    if (product) {
      setProduct(product);
    } else {
      setError(true);
    }
    setLoading(false);
  }, [id]);

  if (loading) return <ProductPageSkeleton />;

  if (error || !product) return <ProductNotFound />;

  return (
    <main className='max-w-5xl mx-auto px-4 py-10'>
      <BackButton />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <ProductImages product={product} />

        <ProductDetails product={product} />
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

function ProductNotFound() {
  const navigate = useNavigate();
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
}
