import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutClientRegieComponent } from './ajout-client-regie.component';

describe('AjoutClientRegieComponent', () => {
  let component: AjoutClientRegieComponent;
  let fixture: ComponentFixture<AjoutClientRegieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutClientRegieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutClientRegieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
