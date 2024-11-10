import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicTableBuilderComponent } from './basic-table-builder.component';

describe('BasicTableBuilderComponent', () => {
  let component: BasicTableBuilderComponent;
  let fixture: ComponentFixture<BasicTableBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicTableBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasicTableBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
