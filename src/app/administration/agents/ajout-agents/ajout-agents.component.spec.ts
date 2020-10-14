import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjoutAgentsComponent } from '../agents.component';

//import { AjoutAgentsComponent } from './ajout-agents.component';

describe('AjoutAgentsComponent', () => {
  let component: AjoutAgentsComponent;
  let fixture: ComponentFixture<AjoutAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutAgentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
