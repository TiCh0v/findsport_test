import { Field } from "@/widgets/DynamicFormBuilder/DynamicFormBuilder";

export const validateFunk = (fields: Field[]): boolean => {
    for (const field of fields) {
        const labelRegex = /^[A-Za-z0-9\s]+$/;
        if (!field.label || !labelRegex.test(field.label)) {
            alert(`Label is required and must be in English for field with ID: ${field.id}`);
            return false;
        }
        if (field.type === 'dropdown' && (field.value === "" || typeof field.value === 'boolean')) {
            alert(`A selection is required for the dropdown field with ID: ${field.id}`);
            return false;
        }
        if (field.type === 'checkbox' && typeof field.value !== 'boolean') {
            alert(`Checkbox state is required for field with ID: ${field.id}`);
            return false;
        }
    }
    return true;
};
