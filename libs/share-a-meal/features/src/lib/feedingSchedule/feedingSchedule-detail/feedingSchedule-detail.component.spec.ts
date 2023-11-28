import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedingScheduleDetailComponent } from './feedingSchedule-detail.component';

describe('FeedingScheduleDetailComponent', () => {
  let component: FeedingScheduleDetailComponent;
  let fixture: ComponentFixture<FeedingScheduleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedingScheduleDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedingScheduleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
