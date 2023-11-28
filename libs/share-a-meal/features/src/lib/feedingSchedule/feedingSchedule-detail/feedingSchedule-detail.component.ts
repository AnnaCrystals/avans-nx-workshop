import { Component, OnInit } from '@angular/core';
import { FeedingScheduleService } from '../feedingSchedule.service';
import { IFeedingSchedule } from '@avans-nx-workshop/shared/api';
import { Observable } from 'rxjs';
import { switchMap, filter, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'avans-nx-workshop-user-detail',
  templateUrl: './feedingSchedule-detail.component.html',
  styleUrls: ['./feedingSchedule-detail.component.css'],
})
export class FeedingScheduleDetailComponent implements OnInit {
  feedingSchedule$: Observable<IFeedingSchedule | null> | undefined;

  constructor(
    private feedingScheduleService: FeedingScheduleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.feedingSchedule$ = this.route.params.pipe(
      switchMap((params) => {
        const feedingScheduleId = params['id'];
        return this.feedingScheduleService.read(feedingScheduleId);
      })
    );
  }

  onDeleteClick(): void {
    if (this.feedingSchedule$) {
      this.feedingSchedule$
        .pipe(
          filter((feedingSchedule): feedingSchedule is IFeedingSchedule => !!feedingSchedule),
          take(1)
        )
        .subscribe((feedingSchedule) => {
          if (feedingSchedule.id) {
            console.log(`Deleting feedingSchedule with ID: ${feedingSchedule.id}`);
  
            this.feedingScheduleService.deleteFeedingSchedule(feedingSchedule.id);
           
            console.log(`FeedingSchedule with ID ${feedingSchedule.id} deleted successfully.`);
            
            this.router.navigate(['/feedingSchedule-list']);
          }
        });
    }
  }
  
}
