import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteControlComponent } from './auto-complete-control.component';

describe('AutoCompleteControlComponent', () => {
  let component: AutoCompleteControlComponent;
  let fixture: ComponentFixture<AutoCompleteControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoCompleteControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoCompleteControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
