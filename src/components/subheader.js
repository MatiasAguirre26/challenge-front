'use client';
import { useRouter } from 'next/navigation';

export default function Subheader({ title, showAddProjectButton, showBackButton }) {
  const router = useRouter();

  const handleAddProjectClick = () => {
    router.push('/add');
  };

  const handleBackButtonClick = () => {
    router.push('../');
  };


  return (
    <div className="flex items-center px-8 py-4 text-black bg-white border-b subheader-container">
      {showBackButton &&(
        <button
          aria-label="Volver atras
          "
          onClick={handleBackButtonClick}
          className="flex items-center mr-4 text-gray-500 hover:text-black">
          <svg
            className="w-5 h-5 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      )}
      <h1 className="text-xl font-semibold">{title}</h1>
      {showAddProjectButton && (
        <button
          onClick={handleAddProjectClick}
          aria-label="Agregar proyecto"
          className="px-4 py-2 ml-auto text-white bg-red-500 rounded hover:bg-red-700">
          + Add Project
        </button>
      )}
    </div>
  );
}
