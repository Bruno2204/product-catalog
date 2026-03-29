import { Link, useLocation } from 'react-router-dom'

export default function NotFoundPage() {
  const location = useLocation()

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">

        <p className="text-8xl font-bold text-gray-100 select-none mb-2">
          404
        </p>

        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Page not found
        </h1>

        <p className="text-sm text-gray-400 mb-8 max-w-xs mx-auto">
          The page{' '}
          <span className="font-mono text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded text-xs">
            {location.pathname}
          </span>{' '}
          doesn't exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Back to catalog
          </Link>
        </div>

      </div>
    </main>
  )
}