import { useState, useCallback } from "react";
import { validateFunk } from "@/shared/lib/validationFunk";
import "./DynamicFormBuilder.scss"

export interface Field {
    id: string;
    type: 'text' | 'checkbox' | 'dropdown';
    label: string;
    value: string | boolean;
}

export const DynamicFormBuilder = () => {
    const [fields, setFields] = useState<Field[]>([]);

    const addNewField = (type: Field["type"]) => {
        const newField: Field = {
            id: Date.now().toString(),
            type: type,
            label: "",
            value: type === 'checkbox' ? false : "",
        };
        setFields([...fields, newField]);
    };

    const handleLabelChange = useCallback((id: string, label: string) => {
        setFields(fields => fields.map(field => (field.id === id ? { ...field, label } : field)));
    }, []);
    

    const handleValueChange = (id: string, value: string | boolean) => {
        setFields(fields.map(field => (field.id === id ? { ...field, value } : field)));
    };

    const removeField = (id: string) => {
        setFields(fields.filter(field => field.id !== id));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateFunk(fields)) {
            alert(JSON.stringify(fields, null, 2));
            setFields([])
        }
    };

    return (
        <form className='DynamicFormBuilder' onSubmit={handleSubmit}>
            <div className="addButtonsContainer">
                <button type="button" onClick={() => addNewField('checkbox')}>Добавить checkbox</button>
                <button type="button" onClick={() => addNewField('text')}>Добавить текстовое поле</button>
                <button type="button" onClick={() => addNewField('dropdown')}>Добавить dropdown</button>
            </div>

            {fields.map((field) => (
                <div key={field.id} className="field-container">
                    <input
                        type='text'
                        placeholder='Label'
                        value={field.label}
                        onChange={(e) => handleLabelChange(field.id, e.target.value)}
                        required
                    />
                    {field.type === 'text' && (
                        <input
                            type='text'
                            placeholder='Введите текст'
                            value={field.value as string}
                            onChange={(e) => handleValueChange(field.id, e.target.value)}
                            required
                        />
                    )}
                    {field.type === 'checkbox' && (
                        <input
                            type='checkbox'
                            checked={field.value as boolean}
                            onChange={(e) => handleValueChange(field.id, e.target.checked)}
                        />
                    )}
                    {field.type === 'dropdown' && (
                        <select
                            value={field.value as string}
                            onChange={(e) => handleValueChange(field.id, e.target.value)}
                        >
                            <option value=''>Select an option</option>
                            <option value='Option 1'>Option 1</option>
                            <option value='Option 2'>Option 2</option>
                            <option value='Option 3'>Option 3</option>
                        </select>
                    )}
                    <button type="button" onClick={() => removeField(field.id)}>Удалить</button>
                </div>
            ))}

            {fields.length > 0 && (
                <button type="submit" className="submit-button">Отправить форму</button>
            )}
        </form>
    );
};
