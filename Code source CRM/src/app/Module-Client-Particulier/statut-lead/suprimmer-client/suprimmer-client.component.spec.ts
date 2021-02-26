import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuprimmerClientComponent } from './suprimmer-client.component';

describe('SuprimmerClientComponent', () => {
  let component: SuprimmerClientComponent;
  let fixture: ComponentFixture<SuprimmerClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuprimmerClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuprimmerClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
