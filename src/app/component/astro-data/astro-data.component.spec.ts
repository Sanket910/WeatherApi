import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstroDataComponent } from './astro-data.component';

describe('AstroDataComponent', () => {
  let component: AstroDataComponent;
  let fixture: ComponentFixture<AstroDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstroDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AstroDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
