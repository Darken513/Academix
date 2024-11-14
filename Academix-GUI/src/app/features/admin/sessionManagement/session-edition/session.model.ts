import { FormEntity, FormField } from "../../../../shared/components/form-builder/utilities/FormEntity";

export class SessionForm extends FormEntity {
    id: number | undefined;

    @FormField({
        label: 'Session date',
        type: 'calendar',
        required: true,
    })
    sessionDate: any;

    @FormField({
        label: 'Start time',
        type: 'calendar',
        params:{timeOnly:true},
        required: true,
    })
    startTime: string = '';

    @FormField({
        label: 'End time',
        type: 'calendar',
        params:{timeOnly:true},
        required: true,
    })
    endTime: string = '';

    enabled: boolean | undefined;
    lastUpdate: Date | undefined;
    createdAt: Date | undefined;

    room: undefined; //ManyToOne
    cours: undefined; //ManyToOne
    
    constructor() {
        super();
    }
}