import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-base-form-field',
  template: '',
})
export abstract class BaseFormFieldComponent implements OnChanges, OnInit {
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() value: any = '';
  @Input() options?: string[];
  @Input() fetchOptionsFrom?: string;
  @Input() params?: any;
  @Input() inputRegex?: RegExp;
  @Input() helpers?: string[];
  @Input() displayCondition?: () => boolean;
  @Input() errorEmitter?: EventEmitter<any>;
  @Output() valueChange = new EventEmitter<any>();
  @Output() blur = new EventEmitter<void>();
  visible: boolean = true;
  errorMessage: string = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.errorEmitter?.subscribe((next) => {
      this.errorMessage = next.error ? next.error : '';
    })
    if (this.fetchOptionsFrom) {
      this.http.get<any>(this.fetchOptionsFrom).subscribe({
        next: (next) => {
          this.options = next;
        }
      });
    }
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

  isConformToRegex(value: string) {
    if (!this.inputRegex)
      return true;
    return this.inputRegex.test(value)
  }

  onValueChange(value: any, avoidCheck?: boolean) {
    this.valueChange.emit({ value: value, avoidCheck: avoidCheck });
  }

  onBlur() {
    this.blur.emit();
  }
}