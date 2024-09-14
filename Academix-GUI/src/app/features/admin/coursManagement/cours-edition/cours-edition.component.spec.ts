import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursEditionComponent } from './cours-edition.component';

describe('CoursEditionComponent', () => {
  let component: CoursEditionComponent;
  let fixture: ComponentFixture<CoursEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursEditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
