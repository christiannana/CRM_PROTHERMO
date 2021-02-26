import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheClientsParticulierComponent } from './fiche-clients-particulier.component';

describe('FicheClientsParticulierComponent', () => {
  let component: FicheClientsParticulierComponent;
  let fixture: ComponentFixture<FicheClientsParticulierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheClientsParticulierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheClientsParticulierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
