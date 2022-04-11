import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursDataComponent } from './hours-data.component';

describe('HoursDataComponent', () => {
  let component: HoursDataComponent;
  let fixture: ComponentFixture<HoursDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoursDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoursDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
