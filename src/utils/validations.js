// utils/validations.js

export const validateProjectForm = (formData) => {
    const errors = {};
    
    if (!formData.name || formData.name.trim() === "") {
        errors.name = "Requiere nombre del proyecto";
    }

    if (!formData.description || formData.description.trim() === "") {
        errors.description = "Requiere descripción";
    }

    if (!formData.projectManager || formData.projectManager.trim() === "") {
        errors.projectManager = "Requiere Project Manager";
    }

    if (!formData.assignedTo || formData.assignedTo.trim() === "") {
        errors.assignedTo = "Requiere asignado";
    }

    return errors;
};
