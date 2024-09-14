import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionEditionComponent } from './session-edition.component';

describe('SessionEditionComponent', () => {
  let component: SessionEditionComponent;
  let fixture: ComponentFixture<SessionEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionEditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SessionEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
