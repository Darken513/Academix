import { FormEntity, FormField } from "../../../../shared/components/form-builder/utilities/FormEntity";

export class SessionForm extends FormEntity {
    id: number | undefined;

    @FormField({
        label: 'Session date',
        type: 'calendar',
        required: true,
    })
    session_date: any;

    @FormField({
        label: 'Start time',
        type: 'calendar',
        params:{timeOnly:true},
        required: true,
    })
    start_time: string = '';

    @FormField({
        label: 'End time',
        type: 'calendar',
        params:{timeOnly:true},
        required: true,
    })
    end_time: string = '';

    enabled: boolean | undefined;
    last_update: Date | undefined;
    created_at: Date | undefined;

    @FormField({
        label: 'Room',
        type: 'select',
        required: true,
        options: [],
        params: {
            optionLabel: 'name',
            returnKey: 'id',
        },
        fetchOptionsFrom: '/rooms/getAll'
    })
    room_id: string = '';


    @FormField({
        label: 'Cours',
        type: 'select',
        required: true,
        options: [],
        params: {
            optionLabel: 'id',
            returnKey: 'id',
        },
        fetchOptionsFrom: '/courses/getAll'
    })
    cours_id: string = '';
    
    constructor() {
        super();
    }
}