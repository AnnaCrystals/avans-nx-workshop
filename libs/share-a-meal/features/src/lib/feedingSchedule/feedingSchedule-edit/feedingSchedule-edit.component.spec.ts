import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedingScheduleEditComponent } from './feedingSchedule-edit.component';

describe('FeedingScheduleEditComponent', () => {
  let component: FeedingScheduleEditComponent;
  let fixture: ComponentFixture<FeedingScheduleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedingScheduleEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedingScheduleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
