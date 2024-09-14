import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentEditionComponent } from './establishment-edition.component';

describe('EstablishmentEditionComponent', () => {
  let component: EstablishmentEditionComponent;
  let fixture: ComponentFixture<EstablishmentEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstablishmentEditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstablishmentEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
