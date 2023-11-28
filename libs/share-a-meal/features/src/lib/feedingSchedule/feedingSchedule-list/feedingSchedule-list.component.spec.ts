import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedingScheduleListComponent } from './feedingSchedule-list.component';

describe('FeedingScheduleListComponent', () => {
  let component: FeedingScheduleListComponent;
  let fixture: ComponentFixture<FeedingScheduleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedingScheduleListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedingScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
