import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutCommercialComponent } from './statut-commercial.component';

describe('StatutCommercialComponent', () => {
  let component: StatutCommercialComponent;
  let fixture: ComponentFixture<StatutCommercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatutCommercialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatutCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
