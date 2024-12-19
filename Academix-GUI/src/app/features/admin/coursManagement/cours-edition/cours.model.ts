import {
    FormEntity,
    FormField,
} from '../../../../shared/components/form-builder/utilities/FormEntity';

export class CoursForm extends FormEntity {
    id: number | undefined;
    enabled: boolean | undefined;
    createdAt: Date | undefined;
    lastUpdate: Date | undefined;

    @FormField({
        label: 'Subject',
        type: 'select',
        required: true,
        options: [],
        params: {
            optionLabel: 'name',
            returnKey: 'id',
            hasFilter: true
        },
        fetchOptionsFrom: '/subjects/getAll'
    })
    subject_id: string = '';

    @FormField({
        label: 'Teacher',
        type: 'select',
        required: true,
        options: [],
        params: {
            optionLabel: 'first_name',
            returnKey: 'id',
            hasFilter: true
        },
        fetchOptionsFrom: '/teachers/getAll'
    })
    teacher_id: string = '';
    
    @FormField({
        label: 'Managed by center?',
        type: 'select',
        options: [true, false],
        required: true,
    })
    managed_by_center: boolean = false;

    @FormField({
        label: 'Student payment type',
        type: 'select',
        options: ['Per-session payment',
            'Flat rate payment',

        ]
      })
    studentPaymentType: string = '';

    @FormField({
        label: 'Student-price per session',
        type: 'text',
        inputRegex: /^[0-9]*$/,
        required: true
    })
    student_price_per_session: number = 0;

    @FormField({
        label: 'Student-price flat rate',
        type: 'text',
        inputRegex: /^[0-9]*$/,
        required: true
    })
    student_price_flat_rate: number = 0;

    @FormField({
        label: 'Teacher payment type',
        type: 'select',
        options: ['Per-session payment',
            'Per-student payment',
            'Flat rate payment'

        ]
    })
    teacherPaymentType: string = '';

    @FormField({
        label: 'Teacher-price per session',
        type: 'text',
        inputRegex: /^[0-9]*$/,
        required: true
    })
    teacher_price_per_session: number = 0;

    @FormField({
        label: 'Teacher-price per student',
        type: 'text',
        inputRegex: /^[0-9]*$/,
        required: true
    })
    teacher_price_per_student: number = 0;

    @FormField({
        label: 'Teacher-price flat rate',
        type: 'text',
        inputRegex: /^[0-9]*$/,
        required: true
    })
    teacher_price_flat_rate: number = 0;

    @FormField({
        label: 'Unpaid total',
        type: 'text',
        inputRegex: /^[0-9]*$/,
    })
    unpaid_total: number = 0;

    constructor() {
        super();
        const studentPricePerSessionField = FormEntity.getFormFieldByKey(this, 'student_price_per_session');
        studentPricePerSessionField.displayCondition = () => {
            return this.studentPaymentType == 'Per-session payment';
        };

        const studentPriceFlatRateField = FormEntity.getFormFieldByKey(this, 'student_price_flat_rate');
        studentPriceFlatRateField.displayCondition = () => {
            return this.studentPaymentType == 'Flat rate payment';
        };

        const teacherPricePerSessionField = FormEntity.getFormFieldByKey(this, 'teacher_price_per_session');
        teacherPricePerSessionField.displayCondition = () => {
            return this.teacherPaymentType == 'Per-session payment';
        };

        const teacherPricePerStudentField = FormEntity.getFormFieldByKey(this, 'teacher_price_per_student');
        teacherPricePerStudentField.displayCondition = () => {
            return this.teacherPaymentType == 'Per-student payment';
        };

        const teacherPriceFlatRateField = FormEntity.getFormFieldByKey(this, 'teacher_price_flat_rate');
        teacherPriceFlatRateField.displayCondition = () => {
            return this.teacherPaymentType == 'Flat rate payment';
        };
    }
}