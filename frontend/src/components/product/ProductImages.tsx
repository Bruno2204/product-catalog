import type { Product } from '../../types.d.ts';

export function ProductImages({ product }: { product: Product }) {
  return (
    <div className='flex flex-col gap-3'>
      {/* Main image */}
      <div className='rounded-xl overflow-hidden border border-gray-200 bg-gray-50 aspect-square'>
        <img
          src={product.images[0] ?? product.thumbnail}
          alt={product.title}
          className='w-full h-full object-contain p-4'
        />
      </div>

      {/* Thumbnails — only show if more than one image */}
      {/* {product.images.length > 1 && (
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
      )} */}
    </div>
  );
}
