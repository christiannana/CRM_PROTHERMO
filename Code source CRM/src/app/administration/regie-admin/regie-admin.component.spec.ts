import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegieAdminComponent } from './regie-admin.component';

describe('RegieAdminComponent', () => {
  let component: RegieAdminComponent;
  let fixture: ComponentFixture<RegieAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegieAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegieAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
