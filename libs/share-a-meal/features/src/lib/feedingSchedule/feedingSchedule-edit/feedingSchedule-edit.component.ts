import {Component, OnInit} from '@angular/core';
import { IFeedingSchedule } from '@avans-nx-workshop/shared/api';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { FeedingScheduleService } from '../../feedingSchedule/feedingSchedule.service';

@Component({
  selector: 'share-a-meal-feedingSchedule-edit',
  templateUrl: './feedingSchedule-edit.component.html',
  styles: [],
})
export class FeedingScheduleEditComponent implements OnInit {
  feedingSchedule: IFeedingSchedule | undefined;
  editForm: FormGroup;
  isNewFeedingSchedule = false;

  constructor(private route: ActivatedRoute, private feedingScheduleService: FeedingScheduleService, private fb: FormBuilder, private router: Router) {
    this.editForm = this.fb.group({
      'description': [''],
      'dietType': [''],
      'time': [''],
      'frequencyPerWeek': [''],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.isNewFeedingSchedule = true;
      return;
    }
    this.feedingScheduleService.read(id).subscribe((feedingSchedule: IFeedingSchedule) => {
      this.feedingSchedule = feedingSchedule;
      this.editForm.setValue({
        'description': feedingSchedule.description,
        'dietType': feedingSchedule.dietType,
        'time': feedingSchedule.time,
        'frequencyPerWeek': feedingSchedule.frequencyPerWeek
      });
    });
  }

  onSubmit() {
    if (this.isNewFeedingSchedule) {
      this.feedingScheduleService.create(this.editForm.value)
        .subscribe(feedingSchedule => this.router.navigate(['/feedingSchedule', feedingSchedule.id]));
    } else {
      const updatedFeedingSchedule: IFeedingSchedule = {
        ...this.feedingSchedule,
        ...this.editForm.value
      };
      this.feedingScheduleService.update(updatedFeedingSchedule)
        .subscribe(() => this.router.navigate(['/feedingSchedule', updatedFeedingSchedule.id]));
    }
  }
}