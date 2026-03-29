import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setError('');
    setLoading(true);
  };

  return (
    <main className='min-h-[80vh] flex items-center justify-center px-4'>
      <div className='w-full max-w-sm'>
        {/* Header */}
        <div className='text-center mb-8'>
          <Link
            to='/'
            className='text-2xl font-semibold text-gray-900 hover:text-gray-600 transition-colors'
          >
            MyShop
          </Link>
          <p className='text-sm text-gray-400 mt-2'>Sign in to your account</p>
        </div>

        {/* Card */}
        <div className='bg-white border border-gray-200 rounded-2xl p-8 shadow-sm'>
          {/* DummyJSON test credentials hint */}
          <div className='bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mb-6'>
            <p className='text-xs text-blue-600 font-medium mb-1'>
              Test credentials
            </p>
            <p className='text-xs text-blue-500'>
              Username: <span className='font-mono'>emilys</span>
            </p>
            <p className='text-xs text-blue-500'>
              Password: <span className='font-mono'>emilyspass</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            {/* Error message */}
            {error && (
              <div className='bg-red-50 border border-red-200 rounded-lg px-4 py-3'>
                <p className='text-xs text-red-600'>{error}</p>
              </div>
            )}

            {/* Username */}
            <div className='flex flex-col gap-1.5'>
              <label
                htmlFor='username'
                className='text-sm font-medium text-gray-700'
              >
                Username
              </label>
              <input
                id='username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='emilys'
                autoComplete='username'
                autoFocus
                disabled={loading}
                className='px-4 py-2.5 rounded-lg border border-gray-300 text-sm
                           placeholder:text-gray-300
                           focus:outline-none focus:ring-2
                           focus:ring-gray-900 focus:border-transparent
                           disabled:bg-gray-50 disabled:text-gray-400'
              />
            </div>

            {/* Password */}
            <div className='flex flex-col gap-1.5'>
              <label
                htmlFor='password'
                className='text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='••••••••'
                autoComplete='current-password'
                disabled={loading}
                className='px-4 py-2.5 rounded-lg border border-gray-300 text-sm
                           placeholder:text-gray-300
                           focus:outline-none focus:ring-2
                           focus:ring-gray-900 focus:border-transparent
                           disabled:bg-gray-50 disabled:text-gray-400'
              />
            </div>

            {/* Submit */}
            <button
              type='submit'
              disabled={loading}
              className='w-full py-2.5 rounded-lg bg-gray-900 text-white text-sm
                         font-medium hover:bg-gray-700 transition-colors
                         disabled:opacity-60 disabled:cursor-not-allowed
                         cursor-pointer mt-2'
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className='text-center text-xs text-gray-400 mt-6'>
          <Link to='/' className='hover:text-gray-700 transition-colors'>
            ← Back to catalog
          </Link>
        </p>
      </div>
    </main>
  );
}
