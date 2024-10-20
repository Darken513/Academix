import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
@Component({
  selector: 'app-base-form-field',
  template: ''
})
export abstract class BaseFormFieldComponent implements OnChanges, OnInit {
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() value: any = '';
  @Input() displayCondition?: () => boolean;
  @Input() errorEmitter?: EventEmitter<any>;
  @Output() valueChange = new EventEmitter<any>();
  @Output() blur = new EventEmitter<void>();
  visible: boolean = true;
  errorMessage: string = '';

  ngOnInit(): void {
    this.errorEmitter?.subscribe((next) => {
      this.errorMessage = next.error ? next.error : '';
    })
  }

  ngOnChanges() {
    this.checkVisibility();
  }

  checkVisibility() {
    if (this.displayCondition) {
      this.visible = this.displayCondition();
      if (!this.visible) {
        this.value = undefined;
        this.onValueChange(this.value, true);
      }
    }
  }

  onValueChange(value: any, avoidCheck?: boolean) {
    this.valueChange.emit({ value: value, avoidCheck: avoidCheck });
  }

  onBlur() {
    this.blur.emit();
  }
}