import { useProductsStore } from '@/store/useProducsStore.ts';

export function Pagination() {
  const { loading, page, totalPages, nextPage, prevPage } = useProductsStore();
  return (
    <>
      {!loading && totalPages > 1 && (
        <div className='flex items-center justify-center gap-3 mt-10'>
          <button
            onClick={() => prevPage()}
            disabled={page === 1}
            className='px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-default cursor-pointer'
          >
            Previous
          </button>
          <span className='text-sm text-gray-500'>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => nextPage()}
            disabled={page === totalPages}
            className='px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-default cursor-pointer'
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
