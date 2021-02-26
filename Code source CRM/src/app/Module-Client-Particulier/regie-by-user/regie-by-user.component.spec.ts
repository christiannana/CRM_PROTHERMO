import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegieByUserComponent } from './regie-by-user.component';

describe('RegieByUserComponent', () => {
  let component: RegieByUserComponent;
  let fixture: ComponentFixture<RegieByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegieByUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegieByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
