import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectEditionComponent } from './subject-edition.component';

describe('SubjectEditionComponent', () => {
  let component: SubjectEditionComponent;
  let fixture: ComponentFixture<SubjectEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectEditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
