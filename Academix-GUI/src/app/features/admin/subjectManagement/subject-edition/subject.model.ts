import {
    FormEntity,
    FormField,
} from '../../../../shared/components/form-builder/utilities/FormEntity';

export class SubjectForm extends FormEntity {
    id: number | undefined;

    @FormField({
        label: 'Regex Limited Field',
        type: 'text',
        required: true,
        inputRegex: /^\d{1,4}$/,
        helpers: [
            'this field takes only numbers as input',
            'it expects a number from 0 to 9999',
        ],
    })
    regexLimited: string = '';

    @FormField({
        label: 'Password Field',
        type: 'text',
        params: {
            type: 'password'
        },
        required: true,
    })
    password: string = '';

    @FormField({ label: 'Text Field', type: 'text', required: true })
    text: string = '';

    @FormField({
        label: 'Textarea Field with regex limitiation',
        type: 'textarea',
        required: true,
        inputRegex: /^[A-Za-z]+$/,
        helpers: [
            'this field takes only letters as input',
        ],
    })
    textareaRegex: string = '';

    @FormField({
        label: 'Checkbox Options',
        type: 'checkboxes',
        required: true,
        params: {
            optionLabel: 'value',
            returnKey: 'key'
        },
        options: [
            { key: 1, value: 'first value' },
            { key: 2, value: 'second value' },
            { key: 3, value: 'third value' },
            { key: 4, value: 'fourth value' },
        ],
        fetchOptionsFrom: 'routeHere'
    })
    checkboxOptions: any;

    @FormField({
        label: 'autocomplete Options',
        type: 'autocomplete',
        required: true,
        options: ['value 1', 'value 2', 'val 3'],
        helpers: [
            'this field takes only letters as input',
        ],
    })
    autocompleteField: any;

    @FormField({
        label: 'Time field',
        type: 'calendar',
        required: true,
        params: {
            timeOnly: true
        },
        helpers: [
            'this field takes only Time as input',
        ],
    })
    timeField: any;

    @FormField({
        label: 'Calendar field',
        type: 'calendar',
        required: true,
        helpers: [
            'this field takes only Dates as input',
        ],
    })
    calendarField: any;

    @FormField({
        label: 'Radio Options',
        type: 'radios',
        required: true,
        params: {
            optionLabel: 'value'
        },
        options: [
            { key: 1, value: 'first value' },
            { key: 2, value: 'second value' },
            { key: 3, value: 'third value' },
            { key: 4, value: 'fourth value' },
        ],
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
        params: {
            optionLabel: 'value',
            returnKey: 'key'
        },
        options: [
            { key: 1, value: 'first value' },
            { key: 2, value: 'second value' },
            { key: 3, value: 'third value' },
            { key: 4, value: 'fourth value' },
        ],
    })
    selectOptions: any;

    @FormField({
        label: 'Select Options',
        type: 'multiselect',
        required: true,
        params: {
            optionLabel: 'value',
        },
        helpers: [
            'this field takes only numbers as input',
            'it expects a number from 0 to 9999'
        ],
        options: [
            { key: 1, value: 'first value' },
            { key: 2, value: 'second value' },
            { key: 3, value: 'third value' },
            { key: 4, value: 'fourth value' },
            { key: 5, value: 'fifth value' },
            { key: 6, value: 'sixth value' },
            { key: 7, value: 'seventh value' },
        ],
    })
    multiSelectOptions: any;

    createdAt: Date | undefined;
    lastUpdate: Date | undefined;

    constructor() {
        super();
        let radioOptionsField = FormEntity.getFormFieldByKey(this, 'radioOptions');
        radioOptionsField.displayCondition = () => {
            return (
                this.checkboxOptions && this.checkboxOptions.find((option: any) => option == 3)
            );
        };
        let selectOptionsField = FormEntity.getFormFieldByKey(
            this,
            'selectOptions'
        );
        selectOptionsField.displayCondition = () => {
            return this.radioOptions && this.radioOptions.key == 2;
        };
    }
}