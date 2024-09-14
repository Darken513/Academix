import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceEditionComponent } from './attendance-edition.component';

describe('AttendanceEditionComponent', () => {
  let component: AttendanceEditionComponent;
  let fixture: ComponentFixture<AttendanceEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceEditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendanceEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
