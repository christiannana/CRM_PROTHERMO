import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutInfosFiscalsComponent } from './ajout-infos-fiscals.component';

describe('AjoutInfosFiscalsComponent', () => {
  let component: AjoutInfosFiscalsComponent;
  let fixture: ComponentFixture<AjoutInfosFiscalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutInfosFiscalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutInfosFiscalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
