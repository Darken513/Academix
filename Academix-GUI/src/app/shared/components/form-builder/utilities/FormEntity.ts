import { EventEmitter } from '@angular/core';
import 'reflect-metadata';

class FormEntity {
    static addFormField(target: any, key: string, config: {
        label: string,
        type: 'text' | 'email' | 'select' | 'textarea' | 'checkboxes' | 'radios',
        required?: boolean,
        options?: string[],
        relation?: string[],
        validators?: ((value: any) => { valid: boolean, errorMsg: string })[];
        displayCondition?: () => boolean
    }) {
        if (!Reflect.hasMetadata('formFields', target)) {
            Reflect.defineMetadata('formFields', [], target);
        }
        const fields = Reflect.getMetadata('formFields', target);
        fields.push({ key, ...config, errorEmitter: new EventEmitter() });
        Reflect.defineMetadata('formFields', fields, target);
    }

    // Retrieve metadata to dynamically build forms
    static getFormFields(target: any) {
        return Reflect.getMetadata('formFields', target) || [];
    }

    static getFormFieldByKey(target: any, key: string) {
        let fields = Reflect.getMetadata('formFields', target) || [];
        return fields.find((field: any) => field.key == key)
    }

    // Validate fields with custom validators
    static validateField(target: any, key: string, value: any): boolean {
        const fields = this.getFormFields(target);
        const field = fields.find((f: any) => f.key === key);
        if (!field || !field.validators) return true;
        let valid = true;
        for (let idx = 0; idx < field.validators.length; idx++) {
            const validator = field.validators[idx];
            let validRes = validator(value);
            if (!validRes.valid) {
                field.errorEmitter.emit({
                    error: validRes.errorMessage
                });
                break;
            }
        }
        return valid;
    }

    // Validate the entire form data
    static validateForm(entity: any): { valid: boolean } {
        const fields: any[] = this.getFormFields(entity);
        let valid = true;

        fields.forEach((field: any) => {
            if (field.displayCondition && !field.displayCondition()) {
                return;
            }
            //todo-achraf else if, to send valid case
            if (field.required && !hasValue(entity[field.key])) {
                field.errorEmitter.emit({
                    error: field.label + ' is required'
                });
                valid = false;
            }
            if (!this.validateField(entity, field.key, entity[field.key])) {
                valid = false;
            }
        });

        return { valid };
    }
}

function hasValue(val: any) {
    if (Array.isArray(val)) {
        return val.length !== 0;
    }
    if (val === null || val === undefined) {
        return false;
    }
    if (typeof val === 'string') {
        return val.trim().length !== 0; 
    }
    if (typeof val === 'object') {
        return Object.keys(val).length !== 0;
    }
    return true;
}

// The decorator method inside FormEntity
function FormField(config: {
    label: string,
    type: 'text' | 'email' | 'select' | 'textarea' | 'checkboxes' | 'radios',
    required?: boolean,
    options?: string[],
    relation?: string[],
    validators?: ((value: any) => { valid: boolean, errorMsg: string })[],
    displayCondition?: (() => boolean),
}) {
    // target refers to the prototype of the class using the decorator
    // key refers to the property using the decorator itself
    return function (target: any, key: string) {
        FormEntity.addFormField(target, key, config);
    };
}

export { FormEntity, FormField };