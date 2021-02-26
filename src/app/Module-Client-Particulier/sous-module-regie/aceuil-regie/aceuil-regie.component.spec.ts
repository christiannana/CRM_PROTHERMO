import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceuilRegieComponent } from './aceuil-regie.component';

describe('AceuilRegieComponent', () => {
  let component: AceuilRegieComponent;
  let fixture: ComponentFixture<AceuilRegieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AceuilRegieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AceuilRegieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
