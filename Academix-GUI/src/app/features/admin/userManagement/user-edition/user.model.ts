import { FormEntity, FormField } from "../../../../shared/components/form-builder/utilities/FormEntity";

export class UserForm extends FormEntity {
    id: number | undefined;

    @FormField({
        label: 'First name',
        type: 'text',
        required: true,
    })
    first_name: string = '';

    @FormField({
        label: 'Last name',
        type: 'text',
        required: true,
    })
    last_name: string = '';

    @FormField({
        label: 'Phone number',
        type: 'text',
        required: true,
        inputRegex: /^[0-9]*$/,
        helpers: [
            'this field takes only numbers as input',
        ],
    })
    phone_number: string = '';

    @FormField({
        label: 'Password',
        type: 'text',
        params: {
            type: 'password'
        },
        required: true,
        linkedFields: ['passwordConfirmation']
    })
    password: string = '';

    @FormField({
        label: 'Confirm password',
        type: 'text',
        params: {
            type: 'password'
        },
        required: true,
        linkedFields: ['password']
    })
    passwordConfirmation: string = '';

    @FormField({
        label: 'Additional information',
        type: 'text',
        required: false,
    })
    note: string = '';

    @FormField({
        label: 'Image URL',
        type: 'text',
        required: true,
    })
    imgURL: string = '';

    @FormField({
        label: 'Wallet balance',
        type: 'text',
        inputRegex: /^[0-9]*$/,
        required: true,
    })
    walletBalance: number = 0;

    @FormField({
        label: 'User type',
        type: 'select',
        required: true,
        options: [],
        fetchOptionsFrom: '/users/getUserRole'
    })
    role: string = '';

    enabled: boolean | undefined;
    last_update: Date | undefined;
    created_at: Date | undefined;

    @FormField({
        label: 'Year level',
        type: 'text',
        required: true,
    })
    yearLevel: string = '';

    @FormField({
        label: 'Establishment',
        type: 'select',
        required: true,
        options: [],
        params: {
            optionLabel: 'name',
            returnKey: 'id',
            hasFilter: true
        },
        fetchOptionsFrom: '/establishments/getAll'
    })
    establishment_id: string = '';

    @FormField({
        label: 'Parent',
        type: 'select',
        required: false,
        options: [],
        params: {
            optionLabel: 'first_name',
            returnKey: 'id',
            hasFilter: true
        },
        fetchOptionsFrom: '/parents/getAll'
    })
    parent_id: string = '';

    constructor() {
        super();
        const yearLevelField = FormEntity.getFormFieldByKey(this, 'yearLevel');
        yearLevelField.displayCondition = () => {
            return this.role == 'student';
        };

        const establishmentField = FormEntity.getFormFieldByKey(this, 'establishment_id');
        establishmentField.displayCondition = () => {
            return this.role == 'teacher' || this.role == 'student';
        };

        const parentField = FormEntity.getFormFieldByKey(this, 'parent_id');
        parentField.displayCondition = () => {
            return this.role == 'student';
        };

        const passwordField = FormEntity.getFormFieldByKey(this, 'password');
        const passwordConfirmationField = FormEntity.getFormFieldByKey(this, 'passwordConfirmation');
        let passwordMatchValidator = (value: any) => {
            if (this.password == this.passwordConfirmation) {
                return {
                    valid: true,
                    errorMsg: ''
                }
            }
            return {
                valid: false,
                errorMsg: 'Password mismatch'
            }
        }
        passwordField.validators = [passwordMatchValidator]
        passwordConfirmationField.validators = [passwordMatchValidator]
    }
}