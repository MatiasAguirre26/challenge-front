'use client';
import Header from "@/components/header";
import Subheader from "@/components/subheader";
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import useProjectStore from '@/stores/projectStore';
import { validateProjectForm } from '@/utils/validations';

export default function Edit() {
    const { projectId } = useParams();
    const router = useRouter();

    const getProjectById = useProjectStore((state) => state.getProjectById);
    const updateProject = useProjectStore((state) => state.updateProject);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        projectManager: '',
        assignedTo: '',
        status: 'Enabled',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const project = getProjectById(projectId);
        if (project) {
            setFormData({
                name: project.name,
                description: project.description,
                projectManager: project.projectManager,
                assignedTo: project.assignedTo,
                status: project.status,
            });
        } else {
            console.error('Proyecto no encontrado para ID:', projectId);
        }
    }, [projectId, getProjectById]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();

        const validationErrors = validateProjectForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        updateProject(projectId, formData);
        router.push('/');
    };

    return (
        <>
            <Header />
            <Subheader title="Edit project" showAddProjectButton={false} showBackButton={true} />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <form className="text-black" onSubmit={handleSaveChanges}>
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
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="projectDescription">
                                Description
                            </label>
                            <input
                                id="description"
                                name="description"
                                type="text"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="projectManager">
                                Manager
                            </label>
                            <select
                                id="projectManager"
                                name="projectManager"
                                value={formData.projectManager}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a manager</option>
                                <option value="Walt Cosani">Walt Cosani</option>
                            </select>
                            {errors.projectManager && <p className="text-sm text-red-500">{errors.projectManager}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="projectAssignedTo">
                                Assigned To
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
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="projectStatus">
                                Status
                            </label>
                            <select
                                id="projectStatus"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Enabled">Enabled</option>
                                <option value="Disabled">Disabled</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                        >
                            Save changes
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
