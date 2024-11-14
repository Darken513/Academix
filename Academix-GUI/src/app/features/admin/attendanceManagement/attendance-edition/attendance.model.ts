import { FormEntity, FormField } from "../../../../shared/components/form-builder/utilities/FormEntity";

export class AttendanceForm extends FormEntity {
    id: number | undefined;

    enabled: boolean | undefined;
    lastUpdate: Date | undefined;
    createdAt: Date | undefined;
    @FormField({
        label: 'Status',
        type: 'text',
        required: true,
    })
    status: string = '';

    @FormField({
        label: 'Notes',
        type: 'text',
        required: true,
    })
    notes: string = '';

    session: undefined; //ManyToOne
    student: undefined; //ManyToOne
    
    constructor() {
        super();
    }
}