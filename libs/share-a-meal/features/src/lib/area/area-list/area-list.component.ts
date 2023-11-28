import { Component, OnInit, OnDestroy } from '@angular/core';
import { AreaService } from '../area.service';
import { IArea } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'; 
import { NgZone } from '@angular/core';

@Component({
  selector: 'avans-nx-workshop-user-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css'],
})
export class AreaListComponent implements OnInit, OnDestroy {
  areas: IArea[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private areaService: AreaService, private router: Router) {} 

  ngOnInit(): void {
    console.log('Before subscribing to the observable');
    this.subscription = this.areaService.list().subscribe((results) => {
        console.log('Inside the observable subscription');
        console.log('Areas:', results);
        this.areas = results;
    });
    console.log('After subscribing to the observable');
}


  ngOnDestroy(): void {
      if (this.subscription) this.subscription.unsubscribe();
  }

  onUserClick(areaId: number): void {
    this.router.navigate(['/area', areaId]);
  }
  
}
