import { EventEmitter } from '@angular/core';
import 'reflect-metadata';

class FormEntity {
    static addFormField(target: any, key: string, config: {
        label: string,
        type: 'text' | 'select' | 'autocomplete' | 'calendar' | 'textarea' | 'checkboxes' | 'radios' | 'multiselect',
        required?: boolean,
        inputRegex?: RegExp,
        helpers?: string[],
        fetchOptionsFrom?: string,
        params?: any,
        options?: any[],
        validators?: ((value: any) => { valid: boolean, errorMsg: string })[];
        linkedFields?: string[];
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
    static validateField(entity: any, fieldKey: string, fieldValue: any, validatedFields: Set<string> = new Set()): boolean {
        if (validatedFields.has(fieldKey)) {
            return true; // Avoid circular validation
        }
    
        validatedFields.add(fieldKey);
    
        const field = this.getFormFields(entity).find((f: any) => f.key === fieldKey);
        if (!field) return true;
    
        if (field.displayCondition && !field.displayCondition()) {
            field.errorEmitter.emit({ error: false });
            return true;
        }
    
        if (field.required && !hasValue(fieldValue)) {
            field.errorEmitter.emit({
                error: field.label + ' is required'
            });
            return false;
        }
    
        if (field.validators) {
            for (const validator of field.validators) {
                const validation = validator(fieldValue);
                if (!validation.valid) {
                    field.errorEmitter.emit({
                        error: validation.errorMsg
                    });
                    return false;
                }
            }
        }
    
        field.errorEmitter.emit({ error: false });
    
        if (field.linkedFields) {
            field.linkedFields.forEach((linkedKey:string) => {
                const linkedFieldValue = entity[linkedKey];
                this.validateField(entity, linkedKey, linkedFieldValue, validatedFields);
            });
        }
    
        return true;
    }
    

    // Validate the entire form data
    static validateForm(entity: any): { valid: boolean } {
        const fields: any[] = this.getFormFields(entity);
        let valid = true;

        fields.forEach((field: any) => {
            if (field.displayCondition && !field.displayCondition()) {
                return;
            }
            if (field.required && !hasValue(entity[field.key])) {
                field.errorEmitter.emit({
                    error: field.label + ' is required'
                });
                valid = false;
            }
            else if (!this.validateField(entity, field.key, entity[field.key])) {
                valid = false;
            }
        });

        return { valid };
    }

    parseJSON(json: any) {
        Object.keys(json).forEach((key) => {
            this[key as keyof FormEntity] = json[key];
        })
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

/**
config: {
    @param {string} label The label for the form field, displayed in the UI.
    @param {string} type The type of form field, can be 'text', 'select', 'textarea', 'autocomplete', 'calendar', 'checkboxes', 'radios' or 'multiselect'.
    @param {boolean} required Optional, Marks the field as required (optional property). If true, the field must be filled out.
    @param {RegExp} inputRegex Optional, A regular expression for the field's value. If provided, the input will only match the inputRegex pattern.
    @param {string[]} helpers Optional. An array of strings that provide examples or descriptions to help the user understand what input is expected for this field.
    @param {any[]} options Optional, For 'select', 'checkboxes', 'autocomplete', 'multiselect' or 'radios' types, these are the options available to choose from.
    @param {string} fetchOptionsFrom Optional, For 'select', 'checkboxes', 'autocomplete', 'multiselect' or 'radios' types, this will tell it to fetch its options with a GET request.
    @param {any} params Optional, further params that are unique to the control you are calling, check the control ts file for more details.
    @param {((value: any) => { valid: boolean, errorMsg: string })[]} validators Optional, An array of custom validator functions. Each validator returns an object with a 'valid' flag and an 'errorMsg' if the validation fails.
    @param {string[]} linkedFields Optional, Linked fields keys, it will bind validation for these fields

    
    @param {(() => boolean)} displayCondition Optional, A function that returns a boolean determining whether this field should be displayed.
*/
function FormField(config: {
    label: string,
    type: 'text' | 'select' | 'autocomplete' | 'calendar' | 'textarea' | 'checkboxes' | 'radios' | 'multiselect',
    required?: boolean,
    inputRegex?: RegExp,
    helpers?: string[],
    options?: any[],
    fetchOptionsFrom?: string,
    params?: any,
    validators?: ((value: any) => { valid: boolean, errorMsg: string })[],
    linkedFields?: string[];
    displayCondition?: (() => boolean),
}) {
    // target refers to the prototype of the class using the decorator
    // key refers to the property using the decorator itself
    return function (target: any, key: string) {
        FormEntity.addFormField(target, key, config);
    };
}

export { FormEntity, FormField };