import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DinosaurEditComponent } from './dinosaur-edit.component';

describe('DinosaurEditComponent', () => {
  let component: DinosaurEditComponent;
  let fixture: ComponentFixture<DinosaurEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DinosaurEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DinosaurEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
