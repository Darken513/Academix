import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomEditionComponent } from './room-edition.component';

describe('RoomEditionComponent', () => {
  let component: RoomEditionComponent;
  let fixture: ComponentFixture<RoomEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomEditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
