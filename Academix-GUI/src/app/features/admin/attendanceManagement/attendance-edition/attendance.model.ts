import { FormEntity, FormField } from "../../../../shared/components/form-builder/utilities/FormEntity";

export class AttendanceForm extends FormEntity {
    id: number | undefined;

    enabled: boolean | undefined;
    last_update: Date | undefined;
    created_at: Date | undefined;
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

    @FormField({
        label: 'Session',
        type: 'select',
        required: true,
        options: [],
        params: {
            optionLabel: 'id',
            returnKey: 'id',
            hasFilter: true
        },
        fetchOptionsFrom: '/sessions/getAll'
    })
    session_id: string = '';

    @FormField({
        label: 'Student',
        type: 'select',
        required: true,
        options: [],
        params: {
            optionLabel: 'name',
            returnKey: 'id',
            hasFilter: true
        },
        fetchOptionsFrom: '/students/getAll'
    })
    student_id: string = '';
    
    constructor() {
        super();
    }
}