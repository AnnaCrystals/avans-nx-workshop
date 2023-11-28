import { Component, OnInit, OnDestroy } from '@angular/core';
import {FeedingScheduleService } from '../feedingSchedule.service';
import { IFeedingSchedule } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'; 
import { NgZone } from '@angular/core';

@Component({
  selector: 'avans-nx-workshop-user-list',
  templateUrl: './feedingSchedule-list.component.html',
  styleUrls: ['./feedingSchedule-list.component.css'],
})
export class FeedingScheduleListComponent implements OnInit, OnDestroy {
  feedingSchedules: IFeedingSchedule[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private feedingScheduleService: FeedingScheduleService, private router: Router) {} 

  ngOnInit(): void {
    console.log('Before subscribing to the observable');
    this.subscription = this.feedingScheduleService.list().subscribe((results) => {
        console.log('Inside the observable subscription');
        console.log('Feeding schedules:', results);
        this.feedingSchedules = results;
    });
    console.log('After subscribing to the observable');
}


  ngOnDestroy(): void {
      if (this.subscription) this.subscription.unsubscribe();
  }

  onUserClick(feedingScheduleId: number): void {
    this.router.navigate(['/feedingSchedule', feedingScheduleId]);
  }
  
}