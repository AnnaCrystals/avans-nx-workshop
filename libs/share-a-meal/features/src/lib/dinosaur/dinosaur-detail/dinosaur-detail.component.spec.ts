import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DinosaurDetailComponent } from './dinosaur-detail.component';

describe('DinosaurDetailComponent', () => {
  let component: DinosaurDetailComponent;
  let fixture: ComponentFixture<DinosaurDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DinosaurDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DinosaurDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
