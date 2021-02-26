import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheClientRegieComponent } from './fiche-client-regie.component';

describe('FicheClientRegieComponent', () => {
  let component: FicheClientRegieComponent;
  let fixture: ComponentFixture<FicheClientRegieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheClientRegieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheClientRegieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
