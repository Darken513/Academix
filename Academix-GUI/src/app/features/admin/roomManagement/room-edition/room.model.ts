import {
    FormEntity,
    FormField,
} from '../../../../shared/components/form-builder/utilities/FormEntity';

export class RoomForm extends FormEntity {
    id: number | undefined;
    @FormField({
        label: 'Room name',
        type: 'text',
        required: true,
    })
    name: string = '';
    @FormField({
        label: 'Room capacity',
        type: 'text',
        required: true,
        inputRegex: /^[0-9]*$/,
        helpers: [
            'this field takes only numbers as input',
        ],
    })
    capacity: number = 0;

    constructor() {
        super();
    }
}