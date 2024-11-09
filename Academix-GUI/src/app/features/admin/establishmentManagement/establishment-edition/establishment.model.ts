import {
    FormEntity,
    FormField,
} from '../../../../shared/components/form-builder/utilities/FormEntity';

export class EstablishmentForm extends FormEntity {
    id: number | undefined;

    @FormField({
        label: 'Establishment name',
        type: 'text',
        required: true,
    })
    name: string = '';

    @FormField({
        label: 'Additional information',
        type: 'text',
        required: false,
    })
    description: string = '';

    enabled: boolean | undefined;

    createdAt: Date | undefined;

    lastUpdate: Date |undefined;

    constructor() {
        super();
    }
}