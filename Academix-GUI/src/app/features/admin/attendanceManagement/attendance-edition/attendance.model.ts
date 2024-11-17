import {
  FormEntity,
  FormField,
} from '../../../../shared/components/form-builder/utilities/FormEntity';

export class AttendanceForm extends FormEntity {
  id: number | undefined;

  enabled: boolean | undefined;
  last_update: Date | undefined;
  created_at: Date | undefined;
  @FormField({
    label: 'Status',
    type: 'radios',
    options: ['present', 'absent'],
    required: true,
  })
  status: string = '';

  @FormField({
    label: 'Notes',
    type: 'text',
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
      hasFilter: true,
    },
    fetchOptionsFrom: '/sessions/getAll',
  })
  session_id: string = '';

  @FormField({
    label: 'Student',
    type: 'select',
    required: true,
    options: [],
    params: {
      optionLabel: 'first_name',
      returnKey: 'id',
      hasFilter: true,
    },
    fetchOptionsFrom: '/students/getAll',
  })
  student_id: string = '';

  constructor() {
    super();
  }
}
