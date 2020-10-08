import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuoptionComponent } from './menuoption.component';

describe('MenuoptionComponent', () => {
  let component: MenuoptionComponent;
  let fixture: ComponentFixture<MenuoptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuoptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
