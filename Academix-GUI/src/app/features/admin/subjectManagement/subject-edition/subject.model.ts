import {
    FormEntity,
    FormField,
} from '../../../../shared/components/form-builder/utilities/FormEntity';

export class SubjectForm extends FormEntity {
    id: number | undefined;

    @FormField({
        label: 'Subject Name',
        type: 'text',
        required: true,
        inputRegex: /^\d{1,4}$/,
        helpers: [
            'this field takes only numbers as input',
            'it expects a number from 0 to 9999',
            '../../../../shared/components/form-builder/utilities/FormEntity',
            '@ManyToOne(() => Cours, (cours) => cours.centerReferedUsers)',
        ],
    })
    name: string = '';

    @FormField({ label: 'lehna hedha test Name', type: 'text', required: true })
    test: string = '';

    @FormField({
        label: 'Description',
        type: 'textarea',
        required: true,
        inputRegex: /^[A-Za-z]+$/,
        helpers: [
            'this field takes only letters as input',
        ],
    })
    description: string = '';

    @FormField({
        label: 'Checkbox Options',
        type: 'checkboxes',
        required: true,
        options: ['first value', 'second value', 'third value'],
    })
    checkboxOptions: any;

    @FormField({
        label: 'Radio Options',
        type: 'radios',
        required: true,
        options: ['first value', 'second value', 'third value'],
    })
    radioOptions: any;

    @FormField({
        label: 'Select Options',
        type: 'select',
        required: true,
        helpers: [
            'this field takes only numbers as input',
            'it expects a number from 0 to 9999'
        ],
        options: ['first value', 'second value', 'third value'],
    })
    selectOptions: any;

    createdAt: Date | undefined;
    lastUpdate: Date | undefined;

    constructor() {
        super();
        let radioOptionsField = FormEntity.getFormFieldByKey(this, 'radioOptions');
        radioOptionsField.displayCondition = () => {
            return (
                this.checkboxOptions && this.checkboxOptions.includes('second value')
            );
        };
        let selectOptionsField = FormEntity.getFormFieldByKey(
            this,
            'selectOptions'
        );
        selectOptionsField.displayCondition = () => {
            return this.radioOptions == 'first value';
        };
    }
}
