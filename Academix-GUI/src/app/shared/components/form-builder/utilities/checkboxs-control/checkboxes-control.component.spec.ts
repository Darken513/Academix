import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxesControlComponent } from './checkboxes-control.component';

describe('CheckboxesControlComponent', () => {
  let component: CheckboxesControlComponent;
  let fixture: ComponentFixture<CheckboxesControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxesControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckboxesControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
