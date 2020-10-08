import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierFicheClientComponent } from './modifier-fiche-client.component';

describe('ModifierFicheClientComponent', () => {
  let component: ModifierFicheClientComponent;
  let fixture: ComponentFixture<ModifierFicheClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierFicheClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierFicheClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
