import 'reflect-metadata';

class FormEntity {
    static addFormField(target: any, key: string, config: {
        label: string,
        type: 'text' | 'email' | 'select' | 'textarea' | 'checkbox' | 'multicheckbox',
        required?: boolean,
        options?: string[],
        relation?: string[]
    }) {
        if (!Reflect.hasMetadata('formFields', target)) {
            Reflect.defineMetadata('formFields', [], target);
        }
        const fields = Reflect.getMetadata('formFields', target);
        fields.push({ key, ...config });
        Reflect.defineMetadata('formFields', fields, target);
    }
}

// The decorator method inside FormEntity
function FormField(config: {
    label: string,
    type: 'text' | 'email' | 'select' | 'textarea' | 'checkbox' | 'multicheckbox',
    required?: boolean,
    options?: string[],
    relation?: string[]
}) {
    //here target refers the prototype of the class using the decorator
    //key refers to the proprety using the decorator itself 
    return function (target: any, key: string) {
        FormEntity.addFormField(target, key, config);
    };
}

export { FormEntity, FormField };