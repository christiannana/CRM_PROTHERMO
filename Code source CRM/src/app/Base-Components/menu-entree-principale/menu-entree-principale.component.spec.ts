import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEntreePrincipaleComponent } from './menu-entree-principale.component';

describe('MenuEntreePrincipaleComponent', () => {
  let component: MenuEntreePrincipaleComponent;
  let fixture: ComponentFixture<MenuEntreePrincipaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuEntreePrincipaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuEntreePrincipaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
