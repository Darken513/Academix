import 'reflect-metadata';

class FormEntity {
    static addFormField(target: any, key: string, config: {
        label: string,
        type: 'text' | 'email' | 'select' | 'textarea' | 'checkboxes' | 'radios',
        required?: boolean,
        options?: string[],
        relation?: string[],
        validators?: ((value: any) => boolean)[]
    }) {
        if (!Reflect.hasMetadata('formFields', target)) {
            Reflect.defineMetadata('formFields', [], target);
        }
        const fields = Reflect.getMetadata('formFields', target);
        fields.push({ key, ...config });
        Reflect.defineMetadata('formFields', fields, target);
    }

    // Retrieve metadata to dynamically build forms
    static getFormFields(target: any) {
        return Reflect.getMetadata('formFields', target) || [];
    }

    // Validate fields with custom validators
    static validateField(target: any, key: string, value: any): boolean {
        const fields = this.getFormFields(target);
        const field = fields.find((f: any) => f.key === key);
        if (!field || !field.validators) return true;
        return field.validators.every((validator: any) => validator(value));
    }

    // Validate the entire form data
    static validateForm(target: any, formData: any): { valid: boolean, errors: string[] } {
        const fields: any[] = this.getFormFields(target);
        const errors: any[] = [];
        let valid = true;

        fields.forEach((field: any) => {
            if (field.required && !formData[field.key]) {
                valid = false;
                errors.push(`${field.label} is required`);
            }
            if (!this.validateField(target, field.key, formData[field.key])) {
                valid = false;
                errors.push(`Validation failed for ${field.label}`);
            }
        });

        return { valid, errors };
    }
}

// The decorator method inside FormEntity
function FormField(config: {
    label: string,
    type: 'text' | 'email' | 'select' | 'textarea' | 'checkboxes' | 'radios',
    required?: boolean,
    options?: string[],
    relation?: string[],
    validators?: ((value: any) => boolean)[]
}) {
    // target refers to the prototype of the class using the decorator
    // key refers to the property using the decorator itself
    return function (target: any, key: string) {
        FormEntity.addFormField(target, key, config);
    };
}

export { FormEntity, FormField };