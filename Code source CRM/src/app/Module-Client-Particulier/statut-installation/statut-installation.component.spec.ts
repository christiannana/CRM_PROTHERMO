import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutInstallationComponent } from './statut-installation.component';

describe('StatutInstallationComponent', () => {
  let component: StatutInstallationComponent;
  let fixture: ComponentFixture<StatutInstallationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatutInstallationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatutInstallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
