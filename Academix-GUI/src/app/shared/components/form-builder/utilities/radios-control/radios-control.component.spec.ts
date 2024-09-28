import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiosControlComponent } from './radios-control.component';

describe('RadiosControlComponent', () => {
  let component: RadiosControlComponent;
  let fixture: ComponentFixture<RadiosControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadiosControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadiosControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
