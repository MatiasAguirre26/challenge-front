'use client';

import Header from "@/components/header";
import Subheader from "@/components/subheader";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useProjectStore from '@/stores/projectStore';
import { nanoid } from 'nanoid';
import { validateProjectForm } from '@/utils/validations';

export default function AddProject() {
    const router = useRouter();
    const addProject = useProjectStore((state) => state.addProject);
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        projectManager: '',
        assignedTo: '',
        status: 'Enabled'
    });
    
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        // Validar el formulario
        const validationErrors = validateProjectForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; // Detener el envío si hay errores
        }

        const project = {
            id: nanoid(),  // Generar un ID único
            name: formData.name,
            description: formData.description,
            projectManager: formData.projectManager,
            assignedTo: formData.assignedTo,
            status: formData.status,
        };

        addProject(project);
        router.push('/');
    };

    return (
        <>
            <Header />
            <Subheader title="Add project" showAddProjectButton={false} showBackButton={true} />

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <form className="text-black" onSubmit={handleSubmit}>
                        {/* Project Name */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="projectName">
                                Project name
                            </label>
                            <input
                                id="projectName"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                        </div>

                        {/* Project Manager */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="projectManager">
                                Project manager
                            </label>
                            <select
                                id="projectManager"
                                name="projectManager"
                                value={formData.projectManager}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a person</option>
                                <option value="Walt Cosani">Walt Cosani</option>
                            </select>
                            {errors.projectManager && <p className="text-sm text-red-500">{errors.projectManager}</p>}
                        </div>

                        {/* Assigned To */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="assignedTo">
                                Assigned to
                            </label>
                            <select
                                id="assignedTo"
                                name="assignedTo"
                                value={formData.assignedTo}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a person</option>
                                <option value="Ignacio Truffa">Ignacio Truffa</option>
                            </select>
                            {errors.assignedTo && <p className="text-sm text-red-500">{errors.assignedTo}</p>}
                        </div>

                        {/* Status */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="status">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Enabled">Enabled</option>
                                <option value="Disabled">Disabled</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                        >
                            Create project
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

