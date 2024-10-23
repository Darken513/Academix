import { FormEntity, FormField } from "../../../../shared/components/form-builder/utilities/FormEntity";

export class UserForm extends FormEntity {
    id?: number;
    @FormField({ label: 'First Name', type: 'text', required: true })
    firstName: string = '';

    @FormField({ label: 'Last Name', type: 'text', required: true })
    lastName: string = '';

    @FormField({ label: 'User Gender', type: 'radios', options: ['Male', 'Female', 'Other'] })
    gender: string = '';

    @FormField({ label: 'Age', type: 'text', required: true, inputRegex: /^[0-9]/ })
    age?: number;

    @FormField({ label: 'Email', type: 'text', required: true })
    email?: string;

    constructor() {
        super();
        const emailField = FormEntity.getFormFieldByKey(this, 'email');
        emailField.displayCondition = () => {
            return this.gender == 'Male';
        }
        emailField.validators = [
            (value: any) => {
                if (/^[^@]+@[^@]+\.[^@]+$/.test(value)) {
                    return {
                        valid: true,
                        errorMsg: ''
                    }
                } else {
                    return {
                        valid: false,
                        errorMsg: 'should contain email'
                    }
                }
            }
        ]
    }
}