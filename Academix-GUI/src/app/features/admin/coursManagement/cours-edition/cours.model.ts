import {
    FormEntity,
    FormField,
} from '../../../../shared/components/form-builder/utilities/FormEntity';

export class CoursForm extends FormEntity {
    id: number | undefined;
    enabled: boolean | undefined;
    createdAt: Date | undefined;
    lastUpdate: Date | undefined;
    /*
    subject: number | undefined;
    teacher: number | undefined;
    */

    constructor() {
        super();
    }
}