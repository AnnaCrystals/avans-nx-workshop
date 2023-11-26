import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DinosaurListComponent } from './dinosaur-list.component';

describe('DinosaurListComponent', () => {
  let component: DinosaurListComponent;
  let fixture: ComponentFixture<DinosaurListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DinosaurListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DinosaurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
