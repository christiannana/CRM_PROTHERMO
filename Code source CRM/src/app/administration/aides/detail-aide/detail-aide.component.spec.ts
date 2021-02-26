import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAideComponent } from './detail-aide.component';

describe('DetailAideComponent', () => {
  let component: DetailAideComponent;
  let fixture: ComponentFixture<DetailAideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
