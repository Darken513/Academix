import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentEditionComponent } from './payment-edition.component';

describe('PaymentEditionComponent', () => {
  let component: PaymentEditionComponent;
  let fixture: ComponentFixture<PaymentEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentEditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
