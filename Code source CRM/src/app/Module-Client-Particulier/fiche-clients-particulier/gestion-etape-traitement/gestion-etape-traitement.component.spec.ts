import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEtapeTraitementComponent } from './gestion-etape-traitement.component';

describe('GestionEtapeTraitementComponent', () => {
  let component: GestionEtapeTraitementComponent;
  let fixture: ComponentFixture<GestionEtapeTraitementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionEtapeTraitementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionEtapeTraitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
