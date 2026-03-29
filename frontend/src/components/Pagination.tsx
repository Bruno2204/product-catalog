import { LIMIT } from '@/consts.ts';
import { useProducts } from '@/hooks/useProducts.ts';

export function Pagination() {
  const { loading, totalPages, skip, setSkip, currentPage, total } =
    useProducts();
  return (
    <>
      {!loading && totalPages > 1 && (
        <div className='flex items-center justify-center gap-3 mt-10'>
          <button
            onClick={() => setSkip(Math.max(0, skip - LIMIT))}
            disabled={skip === 0}
            className='px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-default cursor-pointer'
          >
            Previous
          </button>
          <span className='text-sm text-gray-500'>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setSkip(skip + LIMIT)}
            disabled={skip + LIMIT >= total}
            className='px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-default cursor-pointer'
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
