import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideTopMenuComponent } from './side-top-menu.component';

describe('SideTopMenuComponent', () => {
  let component: SideTopMenuComponent;
  let fixture: ComponentFixture<SideTopMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideTopMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideTopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
