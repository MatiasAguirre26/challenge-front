import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';

const useProjectStore = create(
    persist(
        (set, get) => ({
            projects: [],
            
            addProject: (project) =>
                set((state) => ({
                    projects: [
                        ...state.projects, 
                        { 
                            ...project, id: nanoid(),// Agrega un ID único al proyecto
                            createdAt: format(new Date(), 'dd/MM/yyyy h:mm a') // Fecha y hora actual formateada
                        }
                    ],
                })),
            updateProject: (id, updatedProject) =>
                set((state) => ({
                    projects: state.projects.map((project) =>
                        project.id === id ? { ...project, ...updatedProject } : project
                    ),
                })),
            deleteProject: (id) =>
                set((state) => ({
                    projects: state.projects.filter((project) => project.id !== id),
                })),
            getProjectById: (id) => {
                const project = get().projects.find((project) => project.id === id);
                if (!project) {
                    return null;
                }
                return project;
            },
        }),
        {
            name: 'project-storage', // Nombre de la key en localStorage
        }
        
    )
    
);

export default useProjectStore;
