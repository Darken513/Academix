import { FormEntity, FormField } from "../../../../shared/components/form-builder/utilities/FormEntity";

export class UserForm extends FormEntity {
    id: number | undefined;

    @FormField({
        label: 'First name',
        type: 'text',
        required: true,
    })
    firstName: string = '';

    @FormField({
        label: 'Last name',
        type: 'text',
        required: true,
    })
    lastName: string = '';

    @FormField({
        label: 'Phone number',
        type: 'text',
        required: true,
        inputRegex: /^[0-9]*$/,
        helpers: [
            'this field takes only numbers as input',
        ],
    })
    phoneNumber: string = '';

    @FormField({
        label: 'Password',
        type: 'text',
        params: {
            type: 'password'
        },
        required: true,
    })
    password: string = '';

    @FormField({
        label: 'Confirm password',
        type: 'text',
        params: {
            type: 'password'
        },
        required: true,
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
    userType: string = '';

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
        type: 'text',
        required: true,
    })
    establishment: string = '';

    constructor() {
        super();
        const yearLevelField = FormEntity.getFormFieldByKey(this, 'yearLevel');
        yearLevelField.displayCondition = () => {
            return this.userType == 'student';
        };

        const establishmentField = FormEntity.getFormFieldByKey(this, 'establishment');
        establishmentField.displayCondition = () => {
            return this.userType == 'teacher';
        };

        /*
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
    }*/
    }
}