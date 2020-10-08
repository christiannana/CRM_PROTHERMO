import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutLeadComponent } from './statut-lead.component';

describe('StatutLeadComponent', () => {
  let component: StatutLeadComponent;
  let fixture: ComponentFixture<StatutLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatutLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatutLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
