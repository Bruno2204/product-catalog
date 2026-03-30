import { useNavigate } from 'react-router-dom';

export function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className='text-sm text-gray-400 hover:text-gray-700 transition-colors mb-8 flex items-center gap-1 cursor-pointer'
    >
      ← Back
    </button>
  );
}
