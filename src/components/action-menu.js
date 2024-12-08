"use client";

import { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/navigation';
import useProjectStore from '@/stores/projectStore';

export default function ActionMenu({ projectId }) {
  const router = useRouter();
  const deleteProject = useProjectStore((state) => state.deleteProject);
  const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (!event.target.closest(".action-menu")) {
          setIsOpen(false);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);
  

  const handleEditClick = () => {
    if (!projectId) return;
    router.push(`/edit/${projectId}`);
  };



  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative text-center action-menu">
      {/* Botón para mostrar/ocultar el menú */}
      <button
        onClick={toggleMenu}
        className="text-gray-900 hover:text-gray-900"
      >
        ⋮
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute right-0 z-50 w-48 mt-2 transform translate-x-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <ul>
            <li
              onClick={() => handleEditClick(projectId)}
              className="flex items-center px-4 py-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100">
              <PencilIcon className="w-5 h-5 mr-2 text-gray-600" />
              Edit
            </li>
            <li 
              onClick={() => deleteProject(projectId)}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
              <TrashIcon className="w-5 h-5 mr-2 text-red-600" />
              Delete
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
